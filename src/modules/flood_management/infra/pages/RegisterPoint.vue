<script setup lang="ts">
import { ref, onMounted, watch, reactive } from 'vue'
import mapboxgl from 'mapbox-gl'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import { ProfileForm } from '@/@core/components'
import type { IFormField } from '@/@core/interfaces/form'
import { useFloodController } from '@/modules/flood_management/controllers/FloodController'
import { useNeighborhood } from '@/@core/composables/neighborhood'
import { useFloodMap } from '@/@core/composables/useFloodMap'

// Ensure Mapbox token is set when loading this route directly (F5)
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY
if (!mapboxgl.accessToken) {
  console.error('VITE_MAPBOX_API_KEY is missing. Map cannot be initialized.')
}

const floodStore = useFloodController()
const { loadNeighborhoods, getLocalization } = useNeighborhood()
const { addPoint } = useFloodMap()

const coords = ref<{ lng: number; lat: number } | null>(null)
const mapRef = ref<mapboxgl.Map | null>(null)
const markerRef = ref<mapboxgl.Marker | null>(null)
const neighborhood = ref<string | null>(null)
const regions = ref<any[]>([])
const neighborhoods = ref<any[]>([])
const selectedRegionId = ref<string>('')
const selectedNeighborhoodId = ref<string>('')
const submitting = ref(false)
const regionLoading = ref(false)

const formModel = reactive({
  city: '' as string,
  neighborhood: '' as string,
  probability: 0 as number,
  duration: '00:30' as string,
})

const fields: IFormField[] = [
  {
    id: 'probability',
    label: 'Probabilidade (%)',
    placeholder: '0-100',
    type: 'number',
    autocomplete: 'probability',
  },
  {
    id: 'duration',
    label: 'Duração (HH:MM)',
    placeholder: '00:30',
    type: 'text',
    autocomplete: 'duration',
  },
]

function normalizeName(s: string) {
  return (s || '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[-_]/g, ' ')
    .trim()
    .toLowerCase()
}

async function onSubmit(e: Event) {
  if (!coords.value) return
  const form = e.target as HTMLFormElement
  const fd = new FormData(form)
  // Prefer dados do GeoJSON do mapa; fallback para campos manuais
  const loc = getLocalization(coords.value.lng, coords.value.lat)
  formModel.city = loc?.city || String(fd.get('city') ?? '')
  formModel.neighborhood =
    loc?.neighborhood || String(fd.get('neighborhood') ?? neighborhood.value ?? '')
  formModel.probability = Number(fd.get('probability') ?? 0)
  formModel.duration = String(fd.get('duration') ?? '00:30')

  submitting.value = true
  try {
    // Calculate finished_at from duration HH:MM (adds to now)
    const now = new Date()
    const [hh, mm] = String(formModel.duration || '00:30')
      .split(':')
      .map((v: string) => Number(v || 0))
    const finished = new Date(now)
    finished.setHours(now.getHours() + (isFinite(hh) ? hh : 0))
    finished.setMinutes(now.getMinutes() + (isFinite(mm) ? mm : 30))

    // Normalize probability and clamp to [0,1]
    const possRaw = Number(formModel.probability ?? 0)
    const normalized = possRaw > 1 ? possRaw / 100 : possRaw
    const possibility = Math.max(0, Math.min(1, normalized))

    // Auto-select region/neighborhood if not set
    if (!selectedRegionId.value || !selectedNeighborhoodId.value) {
      if (formModel.city) {
        const data = await floodStore.loadRegionsNeighborhoods(formModel.city)
        regions.value = data?.regions || []
        const nbs: any[] = []
        for (const r of regions.value)
          for (const n of r.neighborhoods || []) nbs.push({ ...n, regionId: r.id })
        neighborhoods.value = nbs
        if (formModel.neighborhood) {
          const target = normalizeName(formModel.neighborhood)
          const match = neighborhoods.value.find((n) => normalizeName(n.name) === target)
          if (match) {
            selectedNeighborhoodId.value = match.id
            selectedRegionId.value = match.regionId
          }
        }
      }
    }

    if (!selectedRegionId.value || !selectedNeighborhoodId.value) {
      throw new Error('Selecione uma região e um bairro válidos')
    }

    const payloadBase: any = {
      region: selectedRegionId.value,
      neighborhood: selectedNeighborhoodId.value,
      possibility,
      created_at: now.toISOString(),
      finished_at: finished.toISOString(),
      props: {
        type: 'Feature',
        properties: {
          city: formModel.city,
          neighborhood: formModel.neighborhood,
        },
        geometry: { type: 'Point', coordinates: [coords.value.lng, coords.value.lat] },
      },
    }

    // Normalize city for strict backends (e.g., uppercase and no diacritics)
    const cityNormalized = (formModel.city || '')
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toUpperCase()

    try {
      await floodStore.registerFloodPoint({ city: cityNormalized, ...payloadBase })
      addPoint(
        {
          lat: coords.value.lat,
          lng: coords.value.lng,
          neighborhood: formModel.neighborhood || '',
          city: formModel.city,
          probability: Number(formModel.probability ?? 0),
          duration: formModel.duration || '00:30',
        },
        'backend',
      )
    } catch (e: any) {
      const data = e?.response?.data
      const cityErr = data?.city
      const isInvalidChoice = Array.isArray(cityErr)
        ? cityErr.some((m: string) => /não é um[a]? escolha válida|not a valid choice/i.test(m))
        : typeof cityErr === 'string' &&
          /não é um[a]? escolha válida|not a valid choice/i.test(cityErr)
      if (isInvalidChoice) {
        try {
          // Retry without city if backend rejects it (region/neighborhood should be authoritative)
          await floodStore.registerFloodPoint({ ...payloadBase })
          addPoint(
            {
              lat: coords.value.lat,
              lng: coords.value.lng,
              neighborhood: formModel.neighborhood || '',
              city: formModel.city,
              probability: Number(formModel.probability ?? 0),
              duration: formModel.duration || '00:30',
            },
            'backend',
          )
        } catch {
          // Queue + add locally for UX
          addPoint(
            {
              lat: coords.value.lat,
              lng: coords.value.lng,
              neighborhood: formModel.neighborhood || '',
              city: formModel.city,
              probability: Number(formModel.probability ?? 0),
              duration: formModel.duration || '00:30',
            },
            'offline',
          )
        }
      } else {
        // Unknown failure: add offline immediately (controller queues the request as well)
        addPoint(
          {
            lat: coords.value.lat,
            lng: coords.value.lng,
            neighborhood: formModel.neighborhood || '',
            city: formModel.city,
            probability: Number(formModel.probability ?? 0),
            duration: formModel.duration || '00:30',
          },
          'offline',
        )
      }
    }

    coords.value = null
  } catch (err) {
    console.error('Falha ao cadastrar ponto:', err)
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  // Try to sync any offline-queued posts when user opens this page
  try {
    await floodStore.syncOfflineQueue()
  } catch {}

  await loadNeighborhoods()

  const map = new mapboxgl.Map({
    container: 'map-register_point',
    style: 'mapbox://styles/mapbox/outdoors-v12',
    center: [-48.8464, -26.3044],
    zoom: 13,
    pitch: 60,
    bearing: -30,
    antialias: true,
  })
  mapRef.value = map

  map.on('load', async () => {
    try {
      // Carregar floodGeojson via fetch (não como import)
      const response = await fetch('/flooding.json')
      const floodGeojson = await response.json()

      // Adicionar fonte de dados do flood
      map.addSource('flood-area', {
        type: 'geojson',
        data: floodGeojson,
      })

      // Camada 3D para simular volume/profundidade de alagamento
      map.addLayer({
        id: 'flood-area-volume',
        type: 'fill-extrusion',
        source: 'flood-area',
        paint: {
          'fill-extrusion-color': [
            'interpolate',
            ['linear'],
            ['get', 'risk_level'],
            0.0,
            '#add8e6', // lightblue
            1.0,
            '#00008b', // darkblue
          ],
          'fill-extrusion-height': ['get', 'depth'],
          'fill-extrusion-base': 0,
          'fill-extrusion-opacity': 0.5,
        },
      })

      map.addSource('flood-polygon', {
        type: 'geojson',
        data: floodStore.polygon ?? {
          type: 'FeatureCollection',
          features: [],
        },
      })
      map.addLayer({
        id: 'flood-polygon-volume',
        type: 'fill-extrusion',
        source: 'flood-polygon',
        paint: {
          'fill-extrusion-color': [
            'interpolate',
            ['linear'],
            ['get', 'risk_level'],
            0.0,
            '#add8e6', // lightblue
            1.0,
            '#00008b', // darkblue
          ],
          'fill-extrusion-height': ['get', 'depth'],
          'fill-extrusion-base': 0,
          'fill-extrusion-opacity': 0.5,
        },
      })

      watch(
        () => floodStore.polygon,
        (newPolygon) => {
          const source = map.getSource('flood-polygon') as mapboxgl.GeoJSONSource
          if (source && newPolygon) {
            source.setData(newPolygon)
          }
        },
        { deep: true },
      )
    } catch (error) {
      console.error('Erro ao carregar floodGeojson:', error)
    }
  })

  map.on('click', (e) => {
    const { lng, lat } = e.lngLat
    updateLocationFromLngLat(lng, lat)
    // Create or move a draggable marker
    if (!markerRef.value) {
      markerRef.value = new mapboxgl.Marker({ draggable: true }).setLngLat([lng, lat]).addTo(map)
      markerRef.value.on('dragend', () => {
        const ll = markerRef.value!.getLngLat()
        updateLocationFromLngLat(ll.lng, ll.lat)
      })
    } else {
      markerRef.value.setLngLat([lng, lat])
    }
  })
})

function updateLocationFromLngLat(lng: number, lat: number) {
  coords.value = { lng, lat }
  const loc = getLocalization(lng, lat)
  neighborhood.value = loc?.neighborhood ?? null
  if (loc?.city) formModel.city = loc.city
  if (loc?.neighborhood) formModel.neighborhood = loc.neighborhood

  if (formModel.city) {
    regionLoading.value = true
    floodStore
      .loadRegionsNeighborhoods(formModel.city)
      .then((data: any) => {
        regions.value = data?.regions || []
        const nbs: any[] = []
        for (const r of regions.value)
          for (const n of r.neighborhoods || []) nbs.push({ ...n, regionId: r.id })
        neighborhoods.value = nbs
        if (formModel.neighborhood) {
          const target = normalizeName(formModel.neighborhood)
          const match = neighborhoods.value.find((n) => normalizeName(n.name) === target)
          if (match) {
            selectedNeighborhoodId.value = match.id
            selectedRegionId.value = match.regionId
          }
        }
      })
      .catch((err: any) => console.error('Erro ao carregar regiões/bairros:', err))
      .finally(() => (regionLoading.value = false))
  }
}

// When region changes, filter neighborhood options for a tighter UX
watch(selectedRegionId, (rid) => {
  if (!rid) return
  const nbs = neighborhoods.value.filter((n: any) => n.regionId === rid)
  neighborhoods.value = nbs
  if (!nbs.find((n: any) => n.id === selectedNeighborhoodId.value)) {
    selectedNeighborhoodId.value = ''
  }
})
</script>

<template>
  <div class="grid justify-center px-5 pt-5 pb-20">
    <div class="h-[350px] overflow-hidden rounded-2xl lg:w-[50vw]">
      <div id="map-register_point" class="h-full w-full"></div>
    </div>
    <form class="grid place-items-center" @submit.prevent="onSubmit">
      <ProfileForm :formFields="fields" buttonText="Cadastrar" />
      <div class="mt-3 grid w-[332px] gap-3">
        <div class="grid gap-2">
          <label for="region">Região</label>
          <select
            id="region"
            v-model="selectedRegionId"
            class="w-full rounded-lg border border-[#7AA6C8] px-3 py-3 text-xs text-black outline-none dark:text-[#999999]"
          >
            <option value="" disabled>Selecione a região</option>
            <option v-for="r in regions" :key="r.id" :value="r.id">{{ r.name }}</option>
          </select>
        </div>
        <div class="grid gap-2">
          <label for="neighborhood">Bairro</label>
          <select
            id="neighborhood"
            v-model="selectedNeighborhoodId"
            class="w-full rounded-lg border border-[#7AA6C8] px-3 py-3 text-xs text-black outline-none dark:text-[#999999]"
          >
            <option value="" disabled>Selecione o bairro</option>
            <option v-for="n in neighborhoods" :key="n.id" :value="n.id">
              {{ n.name }}
            </option>
          </select>
        </div>
      </div>
      <p class="mt-2 text-center text-xs text-gray-600">
        Clique no mapa para selecionar a localização do ponto.
        <span v-if="coords">
          Selecionado: {{ coords?.lat?.toFixed(5) }}, {{ coords?.lng?.toFixed(5) }}</span
        >
      </p>
    </form>
  </div>
</template>
