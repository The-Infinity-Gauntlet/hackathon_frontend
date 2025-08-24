<script setup lang="ts">
import { ref, onMounted } from 'vue'
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
})

// import { onMounted } from 'vue'
// import mapboxgl from 'mapbox-gl'
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
// import MapboxDraw from '@mapbox/mapbox-gl-draw'
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
// import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

// mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY

// onMounted(() => {
//   const map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/outdoors-v12',
//     center: [-48.8464, -26.3044],
//     zoom: 13,
//     pitch: 60,
//     bearing: -30,
//     antialias: true,
//   })

//   map.addControl(new mapboxgl.NavigationControl(), 'top-right')

//   const geocoder = new MapboxGeocoder({
//     accessToken: mapboxgl.accessToken,
//     mapboxgl,
//     marker: true,
//     placeholder: 'Buscar local...',
//   })
//   map.addControl(geocoder, 'top-left')

//   const draw = new MapboxDraw({
//     displayControlsDefault: false,
//     controls: {
//       polygon: true,
//       trash: true,
//     },
//     defaultMode: 'draw_polygon',
//   })
//   map.addControl(draw, 'top-left')

//   map.on('draw.create', () => {
//     const data = draw.getAll()
//     console.log('Polígono criado:', data)
//   })

//   map.on('draw.update', () => {
//     const data = draw.getAll()
//     console.log('Polígono atualizado:', data)
//   })

//   map.on('draw.delete', () => {
//     console.log('Polígono removido')
//   })

//   map.on('load', async () => {
//     // Fonte de elevação
//     map.addSource('mapbox-dem', {
//       type: 'raster-dem',
//       url: 'mapbox://mapbox.terrain-rgb',
//       tileSize: 512,
//       maxzoom: 14,
//     })

//     // Ativa terreno com exagero
//     map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 })

//     // Hillshade para sombra do relevo
//     map.addLayer({
//       id: 'hillshade-layer',
//       type: 'hillshade',
//       source: 'mapbox-dem',
//       layout: { visibility: 'visible' },
//       paint: {
//         'hillshade-exaggeration': 0.5,
//       },
//     })

//     // Prédios 3D
//     map.addLayer(
//       {
//         id: '3d-buildings',
//         source: 'composite',
//         'source-layer': 'building',
//         filter: ['==', 'extrude', 'true'],
//         type: 'fill-extrusion',
//         minzoom: 15,
//         paint: {
//           'fill-extrusion-color': '#aaa',
//           'fill-extrusion-height': ['get', 'height'],
//           'fill-extrusion-base': ['get', 'min_height'],
//           'fill-extrusion-opacity': 0.6,
//         },
//       },
//       'waterway-label',
//     )

//     try {
//       // Carregar floodGeojson via fetch (não como import)
//       const response = await fetch('/flooding.json')
//       const floodGeojson = await response.json()

//       // Adicionar fonte de dados do flood
//       map.addSource('flood-area', {
//         type: 'geojson',
//         data: floodGeojson,
//       })

//       // Camada 3D para simular volume/profundidade de alagamento
//       map.addLayer({
//         id: 'flood-area-volume',
//         type: 'fill-extrusion',
//         source: 'flood-area',
//         paint: {
//           'fill-extrusion-color': [
//             'interpolate',
//             ['linear'],
//             ['get', 'risk_level'],
//             0.0,
//             '#add8e6', // lightblue
//             1.0,
//             '#00008b', // darkblue
//           ],
//           'fill-extrusion-height': ['get', 'depth'],
//           'fill-extrusion-base': 0,
//           'fill-extrusion-opacity': 0.5,
//         },
//       })
//     } catch (error) {
//       console.error('Erro ao carregar floodGeojson:', error)
//     }
//   })

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
</script>

<template>
  <section class="mb-20">
    <div class="h-[500px] overflow-hidden rounded-2xl">
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
            class="rounded-lg bg-[#2768CA] py-2 text-xs hover:bg-[#263e61]"
          >
            {{ filter.name }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
