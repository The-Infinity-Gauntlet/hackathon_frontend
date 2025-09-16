<script setup lang="ts">
import { ref, onMounted } from 'vue'
import mapboxgl from 'mapbox-gl'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import DataMapboxPopup from './dataMapboxPopup.vue'
import { useNeighborhood } from '@/@core/composables/neighborhood'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY

const { loadNeighborhoods, getLocalization } = useNeighborhood()
const neighborhood = ref<string | null>(null)
const city = ref<string | null>(null)
const showPopup = ref(false)
const togglePopup = () => (showPopup.value = !showPopup.value)
const emit = defineEmits(['close'])

onMounted(async () => {
  await loadNeighborhoods()

  const map = new mapboxgl.Map({
    container: 'map-popup',
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
    } catch (error) {
      console.error('Erro ao carregar floodGeojson:', error)
    }
  })

  map.on('click', (e) => {
    togglePopup()
    const { lng, lat } = e.lngLat
    const localization = getLocalization(lng, lat)
    neighborhood.value = localization.neighborhood
    city.value = localization.city
    // console.log(neighborhood.value, city.value)
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

const handleOverlayClick = (event: MouseEvent) => {
  if ((event.target as HTMLElement).id === 'overlay') {
    emit('close')
  }
}
</script>

<template>
<<<<<<< HEAD
  <div id="overlay" class="fixed inset-0 z-20 flex items-center justify-center bg-black/80" @click="handleOverlayClick">
    <div
      class="flex max-h-[90vh] w-[90%] flex-col overflow-y-auto rounded-2xl bg-white p-4 shadow-lg dark:bg-[#000d19]">
=======
  <div
    id="overlay"
    class="fixed inset-0 z-20 flex items-center justify-center bg-black/80"
    @click="handleOverlayClick"
  >
    <div
      class="flex max-h-[90vh] w-[90%] flex-col overflow-y-auto rounded-2xl bg-white p-4 shadow-lg dark:bg-[#000d19]"
    >
>>>>>>> b7af0da2219448486f2a004193fa7bd39944b902
      <div class="flex items-center justify-between gap-3">
        <button class="material-symbols-outlined text-[#999999]" @click="emit('close')">
          arrow_back_ios
        </button>
<<<<<<< HEAD
        <input type="text" placeholder="Buscar localização"
          class="w-full rounded-2xl border border-[#7AA6C8] px-3 py-2 text-xs outline-none" />
=======
        <input
          type="text"
          placeholder="Buscar localização"
          class="w-full rounded-2xl border border-[#7AA6C8] px-3 py-2 text-xs outline-none"
        />
>>>>>>> b7af0da2219448486f2a004193fa7bd39944b902
        <span class="material-symbols-outlined text-[#7AA6C8]">search</span>
      </div>

      <div class="relative mt-3 h-[70vh] overflow-hidden rounded-2xl">
        <div id="map-popup" class="h-full w-full"></div>
        <DataMapboxPopup :neighborhood="neighborhood" :city="city" v-if="showPopup" />
      </div>
    </div>
  </div>
</template>
