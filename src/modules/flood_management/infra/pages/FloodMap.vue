<script setup lang="ts">
import { ref, onMounted } from 'vue'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { useNeighborhood } from '@/@core/composables/neighborhood'
import { useNavigation } from '@/@core/composables/navigation'
import Table from '../components/table.vue'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY
const neighborhood = ref<string | null>(null)
const isOpen = ref(false)
const { loadNeighborhoods, getNeighborhood } = useNeighborhood()
const { routerBack } = useNavigation()
const toggleSheet = () => {
  isOpen.value = !isOpen.value
}

onMounted(async () => {
  await loadNeighborhoods()

  const map = new mapboxgl.Map({
    container: 'map-admin',
    style: 'mapbox://styles/mapbox/outdoors-v12',
    center: [-48.8464, -26.3044],
    zoom: 13,
    pitch: 60,
    bearing: -30,
    antialias: true,
  })

  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl,
    marker: true,
    placeholder: 'Buscar local...',
  })
  map.addControl(geocoder, 'top-right')

  const draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
      polygon: true,
      trash: true,
    },
    defaultMode: 'draw_polygon',
  })
  map.addControl(draw, 'top-right')

  map.on('draw.create', () => {
    const data = draw.getAll()
    console.log('Polígono criado:', data)
  })

  map.on('draw.update', () => {
    const data = draw.getAll()
    console.log('Polígono atualizado:', data)
  })

  map.on('draw.delete', () => {
    console.log('Polígono removido')
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
    const { lng, lat } = e.lngLat
    neighborhood.value = getNeighborhood(lng, lat)
    console.log('Bairro encontrado:', neighborhood.value)
  })
})

const floodPoints = ref([
  { id: 'joao-costa', neighborhood: 'João Costa', probability: 85, duration: '1 hora' },
  { id: 'jarivatuba', neighborhood: 'Jarivatuba', probability: 72, duration: '30 min' },
  { id: 'adhemar-garcia', neighborhood: 'Adhemar Garcia', probability: 50, duration: '20 min' },
])

// import { onMounted } from 'vue'
// import mapboxgl from 'mapbox-gl'
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
// import MapboxDraw from '@mapbox/mapbox-gl-draw'
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
// import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

// mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY

// onMounted(() => {
//   const map = new mapboxgl.Map({
//     container: 'map-admin',
//     style: 'mapbox://styles/mapbox/outdoors-v12',
//     center: [-48.8464, -26.3044],
//     zoom: 13,
//     pitch: 60,
//     bearing: -30,
//     antialias: true,
//   })

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
</script>

<template>
  <div class="lg:flex-cols-2 relative h-screen w-screen overflow-hidden lg:flex">
    <div class="absolute top-5 left-0 z-10 flex items-center gap-2 px-4">
      <button
        class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 pl-2 text-white transition-colors duration-300 hover:bg-blue-600 dark:bg-[#000D19]"
        @click="routerBack"
      >
        <span class="material-symbols-outlined">arrow_back_ios</span>
      </button>
    </div>

    <div id="map-admin" class="h-screen flex-1"></div>

    <div
      class="absolute bottom-0 left-0 z-10 w-full rounded-t-2xl bg-white p-4 shadow-lg transition-transform duration-300 lg:relative lg:w-[380px] dark:bg-[#00182F]"
      :class="
        isOpen
          ? 'translate-y-0 lg:translate-x-0'
          : 'translate-y-[73%] lg:translate-x-0 lg:translate-y-0'
      "
    >
      <div
        class="lg:absolute lg:top-0 lg:right-0 lg:bottom-0 lg:left-auto lg:h-full lg:rounded-none lg:p-4"
      >
        <div class="grid gap-3" @click="toggleSheet">
          <div class="mx-auto h-1.5 w-12 rounded-full bg-gray-400 lg:hidden"></div>

          <RouterLink
            to="/admin/registrar-ponto"
            class="mx-auto rounded-xl bg-blue-500 px-6 py-2 font-semibold text-white transition-colors duration-300 hover:bg-blue-600 dark:bg-[#000D19]"
          >
            Inserir novo ponto
          </RouterLink>

          <h3 class="mx-auto mt-5 mb-3 font-semibold">Pontos atuais</h3>
          <Table :points="floodPoints" />
        </div>
      </div>
    </div>
  </div>
</template>
