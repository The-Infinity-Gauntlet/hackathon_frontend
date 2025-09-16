<script setup lang="ts">
import { ref, onMounted } from 'vue'
<<<<<<< HEAD
import { useRouter } from 'vue-router'
import mapboxgl from 'mapbox-gl'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import cameras from '@/@core/controllers/FloodCameraMonitoringController'
import { MapboxFilters } from '../components'
=======
import mapboxgl from 'mapbox-gl'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { MapboxFilters } from '../components'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY

const isFullscreen = ref(false)

onMounted(() => {
  const map = new mapboxgl.Map({
    container: 'map-fixed',
    style: 'mapbox://styles/mapbox/outdoors-v12',
    center: [-48.8464, -26.3044],
    zoom: 13,
    pitch: 60,
    bearing: -30,
    antialias: true,
  })

  map.addControl(new mapboxgl.NavigationControl(), 'top-right')
  map.addControl(new mapboxgl.FullscreenControl(), 'bottom-right')

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

  map.on('fullscreenchange', () => {
    isFullscreen.value = document.fullscreenElement !== null
  })

  function addCustomMarker(lng, lat) {
    const el = document.createElement('div')
    el.className = 'custom-marker'
    el.style.backgroundImage = 'url("/weather_information/camera.svg")'
    el.style.width = '80px'
    el.style.height = '80px'
    el.style.backgroundSize = 'contain'
    el.style.backgroundRepeat = 'no-repeat'

    new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(map)
  }

  map.on('load', () => {
    addCustomMarker(-48.7376082, -26.3950226)
  })
})

// import { onMounted } from 'vue'
// import mapboxgl from 'mapbox-gl'
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
// import MapboxDraw from '@mapbox/mapbox-gl-draw'
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
// import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
>>>>>>> b7af0da2219448486f2a004193fa7bd39944b902

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY

const router = useRouter()

onMounted(() => {
  const map = new mapboxgl.Map({
    container: 'map-fixed',
    style: 'mapbox://styles/mapbox/outdoors-v12',
    center: [-48.8464, -26.3044],
    zoom: 13,
    pitch: 60,
    bearing: -30,
    antialias: true,
  })

  map.addControl(new mapboxgl.NavigationControl(), 'top-right')
  if (window.matchMedia('(max-width: 1023px)').matches) {
    map.addControl(new mapboxgl.FullscreenControl(), 'bottom-right')
  }

  function addCustomMarker(lng: number, lat: number, url: string) {
    const el = document.createElement('div')
    el.className = 'custom-marker'
    el.style.backgroundImage = 'url("/weather_information/camera.svg")'
    el.style.width = '80px'
    el.style.height = '80px'
    el.style.backgroundSize = 'contain'
    el.style.backgroundRepeat = 'no-repeat'
    el.style.cursor = 'pointer'

    el.addEventListener('click', () => {
      router.push(url)
    })

    new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(map)
  }

  map.on('load', async () => {
    // map.addSource('mapbox-dem', {
    //   type: 'raster-dem',
    //   url: 'mapbox://mapbox.terrain-rgb',
    //   tileSize: 512,
    //   maxzoom: 14,
    // })
    // map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 })

    // map.addLayer({
    //   id: 'hillshade-layer',
    //   type: 'hillshade',
    //   source: 'mapbox-dem',
    //   layout: { visibility: 'visible' },
    //   paint: {
    //     'hillshade-exaggeration': 0.5,
    //   },
    // })

    // map.addLayer(
    //   {
    //     id: '3d-buildings',
    //     source: 'composite',
    //     'source-layer': 'building',
    //     filter: ['==', 'extrude', 'true'],
    //     type: 'fill-extrusion',
    //     minzoom: 15,
    //     paint: {
    //       'fill-extrusion-color': '#aaa',
    //       'fill-extrusion-height': ['get', 'height'],
    //       'fill-extrusion-base': ['get', 'min_height'],
    //       'fill-extrusion-opacity': 0.6,
    //     },
    //   },
    //   'waterway-label',
    // )

    try {
      const response = await fetch('/flooding.json')
      const floodGeojson = await response.json()

      map.addSource('flood-area', {
        type: 'geojson',
        data: floodGeojson,
      })

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

    cameras.forEach((camera) => {
      addCustomMarker(camera.lng, camera.lat, `cameras/${camera.id}`)
    })
  })

  function addCustomMarker(lng, lat) {
    const el = document.createElement('div')
    el.className = 'custom-marker'
    el.style.backgroundImage = 'url("/weather_information/camera.svg")'
    el.style.width = '80px'
    el.style.height = '80px'
    el.style.backgroundSize = 'contain'
    el.style.backgroundRepeat = 'no-repeat'

    new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(map)
  }

  map.on('load', () => {
    addCustomMarker(-48.7376082, -26.3950226)
  })
})

// onMounted(() => {
//   map.on('click', (e) => {
//     const { lng, lat } = e.lngLat // Obtém as coordenadas (longitude e latitude)
//     const elevation = map.queryTerrainElevation([e.lngLat.lng, e.lngLat.lat])
//     new mapboxgl.Popup()
//       .setLngLat(e.lngLat)
//       .setHTML(
//         `<strong>Elevação:</strong> ${elevation !== null ? elevation.toFixed(2) + ' m' : 'não disponível'} <br>
//         <strong>Coordenadas:</strong><br>
//         Longitude: ${lng.toFixed(10)}<br>
//         Latitude: ${lat.toFixed(10)}`,
//       )
//       .addTo(map)
//   })

//   // popups com informações sobre a profundidade e o nível de risco
//   map.on('click', 'flood-area-volume', (e) => {
//     const feature = e.features[0]
//     const properties = feature.properties
//     const coordinates = e.lngLat

//     new mapboxgl.Popup()
//       .setLngLat(coordinates)
//       .setHTML(`
//       <strong>Área:</strong> ${properties.name}<br>
//       <strong>Profundidade:</strong> ${properties.depth} m<br>
//       <strong>Nível de Risco:</strong> ${properties.risk_level}
//     `)
//       .addTo(map)
//   })

//   map.addSource("flood-area", {
//     type: "geojson",
//     data: {
//       type: "FeatureCollection",
//       geometry: {
//         type: "Point",
//         coordinates: [-48.846, -26.3311]
//       }
//     }
//   })

//   map.addLayer({
//     id: 'flood-area-outline',
//     type: 'circle',
//     source: 'flood-area',
//     paint: {
//       'circle-radius': 40,
//       'circle-color': '#ff0000',
//       'circle-opacity': 1,
//       'circle-stroke-width': 2,
//       'circle-stroke-color': '#ff0000',
//     },
//   })
// })
<<<<<<< HEAD
=======

// import { onMounted, onBeforeUnmount, ref } from 'vue'
// import mapboxgl from 'mapbox-gl'

// mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY

// let map = null

// onMounted(() => {
//   if (map) return

//   map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/streets-v12', // estilo padrão
//     center: [-48.8464, -26.3044],
//     maxBounds: [
//       [-48.95, -26.45],
//       [-48.7, -26.15],
//     ],
//     zoom: 13,
//   })

//   map.addControl(new mapboxgl.NavigationControl(), 'top-right')
//   map.addControl(new mapboxgl.FullscreenControl(), 'bottom-right')
// })

// onBeforeUnmount(() => {
//   if (map) {
//     map.remove()
//     map = null
//   }
// })

const filters = [{ name: 'Geral' }, { name: 'IA' }, { name: 'Especialista' }]

const fields = [
  { start: '81%', end: '100%' },
  { start: '61%', end: '80%' },
  { start: '41%', end: '60%' },
  { start: '21%', end: '40%' },
  { start: '0%', end: '20%' },
]
>>>>>>> b7af0da2219448486f2a004193fa7bd39944b902
</script>

<template>
  <section class="mb-20">
<<<<<<< HEAD
    <div class="relative h-[40vw] min-h-[500px] overflow-hidden rounded-2xl">
      <div id="map-fixed" class="h-full w-full"></div>
      <MapboxFilters class="hidden lg:block" />
    </div>

    <MapboxFilters class="lg:hidden" />
=======
    <div class="h-[40vw] min-h-[500px] overflow-hidden rounded-2xl">
      <div id="map-fixed" class="h-full w-full"></div>
      <MapboxFilters v-if="isFullscreen" class="absolute right-4 bottom-4" />
    </div>

    <div class="mt-10 flex justify-center gap-2">
      <div class="border-r border-[#E5E5E5] px-5 text-center dark:border-[#00182F]">
        <h3 class="text-lg font-semibold">Legendas</h3>
        <p class="text-xs font-semibold">Probabilidade de alagamento</p>

        <div class="mt-5 flex gap-3">
          <div class="h-30 w-5 rounded-lg bg-gradient-to-b from-[#0047AB] to-[#00B2A9]"></div>
          <ul class="grid h-32 justify-between">
            <li v-for="field in fields" :key="field.start" class="text-left text-xs">
              {{ field.end }} - {{ field.start }}
            </li>
          </ul>
        </div>
      </div>

      <div class="px-5 text-center">
        <h3 class="text-lg font-semibold">Camadas</h3>
        <p class="text-xs font-semibold">Aperte para mudar a camada</p>
        <ul class="mt-5 grid gap-3">
          <li
            v-for="filter in filters"
            :key="filter.name"
            class="rounded-lg bg-[#2768CA] py-2 text-xs font-semibold text-white hover:bg-[#263e61]"
          >
            {{ filter.name }}
          </li>
        </ul>
      </div>
    </div>
>>>>>>> b7af0da2219448486f2a004193fa7bd39944b902
  </section>
</template>
