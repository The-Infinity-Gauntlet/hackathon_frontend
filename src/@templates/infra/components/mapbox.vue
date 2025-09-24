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
import { useFloodController } from '@/modules/flood_management/controllers/FloodController'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY

const router = useRouter()
const ctrl = useFloodCameraMonitoringController()
const geolocation = useGeolocationStore()
const { getFloods } = useFloodController()

const { points, init, toGeoJSON } = useFloodMapIA()

onMounted(async () => {
    const map = new mapboxgl.Map({
        container: 'map-fixed',
        style: 'mapbox://styles/mapbox/outdoors-v12',
        center: [-48.88124, -26.26965], // Coordenadas iniciais [longitude, latitude]
        zoom: 13,
        pitch: 60,
        bearing: -30,
        antialias: true,
    })

    geolocation.getCurrentPosition().then((position) => {
        new mapboxgl.Marker().setLngLat([position.longitude, position.latitude]).addTo(map)
        console.log('Posição atual: ', position)
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
        await init()

        const floodPoints = await getFloods()

        floodPoints.results.forEach((fp) => {
            console.log('Ponto de alagamento: ', fp)
            if (fp.props) {
                const sourceId = `flood-point-${fp.id}`
                map.addSource(sourceId, {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: fp.props,
                    },
                })

                map.addLayer({
                    id: sourceId + '-fill',
                    type: 'fill',
                    source: sourceId,
                    paint: {
                        'fill-color': '#ff0000',
                        'fill-opacity': 0.3,
                    },
                })

                map.addLayer({
                    id: sourceId + '-outline',
                    type: 'line',
                    source: sourceId,
                    paint: {
                        'line-color': '#ff0000',
                        'line-width': 2,
                    },
                })
            }
        })

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

            watch(
                points,
                (newPoints) => {
                    console.log('Novos pontos: ', newPoints)
                    const geojson = toGeoJSON()
                    console.log('GeoJSON: ', geojson)
                    if (!map.getSource('flood-points')) {
                        map.addSource('flood-points', {
                            type: 'geojson',
                            data: geojson,
                        })
                        map.addLayer({
                            id: 'flood-points-layer',
                            type: 'heatmap',
                            source: 'flood-points',
                            paint: {
                                'heatmap-weight': [
                                    'interpolate',
                                    ['linear'],
                                    ['get', 'intensity'],
                                    0,
                                    0,
                                    1,
                                    1,
                                ],
                                'heatmap-color': [
                                    'interpolate',
                                    ['linear'],
                                    ['heatmap-density'],
                                    0,
                                    'rgba(0, 0, 255, 0)',
                                    0.1,
                                    '#10439F',
                                    //0.3, "#3981BF",
                                    0.5,
                                    '#0453AF',
                                    //0.7, "#469AA0",
                                    0.9,
                                    '#6DBFC5',
                                    1,
                                    'red',
                                ],
                                'heatmap-radius': [
                                    'interpolate',
                                    ['linear'],
                                    ['zoom'],
                                    10,
                                    30,
                                    15,
                                    65,
                                ],
                                'heatmap-opacity': [
                                    'interpolate',
                                    ['linear'],
                                    ['zoom'],
                                    10,
                                    0.9,
                                    15,
                                    0.75,
                                ],
                            },
                        })
                    } else {
                        const source = map.getSource('flood-points') as mapboxgl.GeoJSONSource
                        source.setData(geojson)
                    }
                },
                { immediate: true },
            )
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
