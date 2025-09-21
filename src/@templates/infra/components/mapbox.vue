<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import mapboxgl from 'mapbox-gl'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { useFloodCameraMonitoringController } from '@/modules/flood_camera_monitoring/controller/FloodCameraMonitoringController'
import { MapboxFilters } from '../components'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY

const router = useRouter()
const ctrl = useFloodCameraMonitoringController()

onMounted(async () => {
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

    function addCustomMarker(lng: number, lat: number, cameraId: string) {
        const el = document.createElement('div')
        el.className = 'custom-marker'
        el.style.backgroundImage = 'url("/weather_information/camera.svg")'
        el.style.width = '80px'
        el.style.height = '80px'
        el.style.backgroundSize = 'contain'
        el.style.backgroundRepeat = 'no-repeat'
        el.style.cursor = 'pointer'

        el.addEventListener('click', () => {
            router.push(`/cameras/${cameraId}`)
        })

        new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(map)
    }

    map.on('load', async () => {
        await ctrl.load()
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

        ctrl.cameras.forEach((camera) => {
            if (camera.latitude && camera.longitude) {
                addCustomMarker(camera.longitude, camera.latitude, camera.id)
            } else {
                console.warn('Câmera sem coordenadas:', camera)
            }
        })
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
</script>

<template>
    <section class="mb-10">
        <div class="relative h-[40vw] min-h-[500px] overflow-hidden rounded-2xl">
            <div id="map-fixed" class="h-full w-full"></div>
            <MapboxFilters class="hidden lg:block" />
        </div>

        <MapboxFilters class="lg:hidden" />
    </section>
</template>
