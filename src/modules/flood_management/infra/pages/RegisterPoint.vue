<script setup lang="ts">
import { ref, onMounted, watch, toRaw } from 'vue'
import mapboxgl from 'mapbox-gl'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { useNeighborhood } from '@/@core/composables/neighborhood'
import { ProfileForm } from '@/@core/components'
import type { IFormField } from '@/@core/interfaces/form'
import { useFloodController } from '../../controllers/FloodController'
import { Api } from '@/@core/services/api'
//import type { Feature } from 'geojson'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY
const { loadNeighborhoods, getNeighborhood } = useNeighborhood()
const floodStore = useFloodController()
const neighborhood = ref<string | null>(null)

const api = new Api()

const fields: IFormField[] = [
  { id: 'city', label: 'Cidade', placeholder: 'Digite a cidade aqui', type: 'text' },
  { id: 'region', label: 'Região', placeholder: 'Digite a região aqui', type: 'text' },
  { id: 'neighborhood', label: 'Bairro', placeholder: 'Digite o bairro aqui', type: 'text' },
  { id: 'possibility', label: 'Probabilidade', placeholder: 'xx,xx', type: 'number' },
  { id: 'created_at', label: 'Início', placeholder: 'xxx', type: 'datetime-local' },
  { id: 'finished_at', label: 'Término', placeholder: 'xxx', type: 'datetime-local' }
]

onMounted(async () => {
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
          type: "FeatureCollection",
          features: []
        }
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

      watch(() => floodStore.polygon, (newPolygon) => {
        console.log("Watch disparou, polygon:", newPolygon)
        const source = map.getSource('flood-polygon') as mapboxgl.GeoJSONSource
        if (source && newPolygon) {
          source.setData(newPolygon)
        }
      }, { deep: true })
    } catch (error) {
      console.error('Erro ao carregar floodGeojson:', error)
    }
  })

  map.on('click', (e) => {
    const { lng, lat } = e.lngLat
    neighborhood.value = getNeighborhood(lng, lat)
    console.log('Bairro encontrado:', neighborhood.value)
    // const elevation = map.queryTerrainElevation([e.lngLat.lng, e.lngLat.lat])
    // new mapboxgl.Popup()
    //   .setLngLat(e.lngLat)
    //   .setHTML(
    //     `<strong>Elevação:</strong> ${elevation !== null ? elevation.toFixed(2) + ' m' : 'não disponível'} <br>
    //     <strong>Coordenadas:</strong><br>
    //     Longitude: ${lng}<br>
    //     Latitude: ${lat}`,
    //   )
    //   .addTo(map)
  })
})

const cityMap = {
  "Joinville": 1,
  "Araquari": 2
}
const regions = ref<{id: number, name: string}[]>([])
const neighborhoods = ref<{id: number, name: string}[]>([])
onMounted(async () => {
  const allRegions = await api.get('/addressing/region/')
  regions.value = allRegions.data

  const allNeighborhoods = await api.get('/addressing/neighborhood/')
  neighborhoods.value = allNeighborhoods.data
})

const formData = ref({
  city: '',
  region: '',
  neighborhood: '',
  possibility: 0,
  created_at: new Date(),
  finished_at: new Date(),
  polygon: floodStore.polygon
  // outros campos
})

const emit = defineEmits(['submit'])

async function submitForm() {
  const cityKey = formData.value.city as keyof typeof cityMap
  if (!(cityKey in cityMap)) {
    console.error("Cidade inválida")
    return
  }
  const cityId = cityMap[cityKey]
  const regionId = regions.value.find(r => r.name === formData.value.region)?.id
  const neighborhoodId = neighborhoods.value.find(r => r.name === formData.value.neighborhood)?.id
  try {
    const createdAtDate = new Date(formData.value.created_at)
    const finishedAtDate = new Date(formData.value.finished_at)
    await floodStore.createFlood({
      city: cityId,
      region: regionId,
      neighborhood: neighborhoodId,
      possibility: formData.value.possibility,
      created_at: createdAtDate.toISOString(),
      finished_at: finishedAtDate.toISOString(),
      props: {
        polygon: toRaw(formData.value.polygon)
      }
    })
    console.log("Form: ", formData.value)
  } catch (error) {
    console.error('Erro ao submeter form:', error)
  }
}
</script>

<template>
  <div class="grid justify-center px-5 pt-5 pb-20">
    <div class="h-[350px] overflow-hidden rounded-2xl lg:w-[50vw]">
      <div id="map-register_point" class="h-full w-full"></div>
    </div>
    <ProfileForm :formFields="fields" buttonText="Cadastrar" v-model="formData" @submit="submitForm" />
  </div>
</template>
