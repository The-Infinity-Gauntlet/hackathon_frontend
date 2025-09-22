<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import mapboxgl from 'mapbox-gl'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { useFloodCameraMonitoringController } from '@/modules/flood_camera_monitoring/controller/FloodCameraMonitoringController'
import { useGeolocationStore } from '@/@core/plugins/registered/pinia/geolocation'
import { MapboxFilters } from '../components'
import { useFloodMapIA } from '@/@core/composables/useFloodMap'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY

const router = useRouter()
const ctrl = useFloodCameraMonitoringController()
const geolocation = useGeolocationStore()

const { points, init, toGeoJSON } = useFloodMapIA()

onMounted(async () => {
    const map = new mapboxgl.Map({
        container: 'map-fixed',
        style: 'mapbox://styles/mapbox/outdoors-v12',
        // center: [-48.8464, -26.3044],
        center: [geolocation.longitude, geolocation.latitude],
        zoom: 13,
        pitch: 60,
        bearing: -30,
        antialias: true,
    })

    new mapboxgl.Marker().setLngLat([geolocation.longitude, geolocation.latitude]).addTo(map)

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
        await init()
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

            watch(points, (newPoints) => {
                console.log("Novos pontos: ", newPoints)
                const geojson = toGeoJSON()
                console.log("GeoJSON: ", geojson)
                if (!map.getSource('flood-points')) {
                    map.addSource('flood-points', {
                        type: 'geojson',
                        data: geojson
                    })
                    map.addLayer({
                        id: "flood-points-layer",
                        type: "heatmap",
                        source: "flood-points",
                        paint: {
                        "heatmap-weight": ["interpolate", ["linear"], ["get", "intensity"], 0, 0, 1, 1],
                        "heatmap-color": [
                        "interpolate",
                        ["linear"],
                        ["heatmap-density"],
                        0, "rgba(0, 0, 255, 0)",
                        0.1, "#10439F",
                        //0.3, "#3981BF",
                        0.5, "#0453AF",
                        //0.7, "#469AA0",
                        0.9, "#6DBFC5",
                        1, "red"
                        ],
                        "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 10, 30, 15, 65],
                        "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 10, 0.9, 15, 0.75]
                        }
                    })  
                } else {
                    const source = map.getSource("flood-points") as mapboxgl.GeoJSONSource
                    source.setData(geojson)
                }
            }, { immediate: true })
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
