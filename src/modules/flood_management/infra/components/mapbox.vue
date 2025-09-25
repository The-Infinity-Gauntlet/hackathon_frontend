<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import mapboxgl from 'mapbox-gl'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { useFloodCameraMonitoringController } from '@/modules/flood_camera_monitoring/controller/FloodCameraMonitoringController'
import { useGeolocationStore } from '@/@core/plugins/registered/pinia/geolocation'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY

const router = useRouter()
const ctrl = useFloodCameraMonitoringController()
const geolocation = useGeolocationStore()

onMounted(async () => {
    const map = new mapboxgl.Map({
        container: 'map-admin',
        style: 'mapbox://styles/mapbox/outdoors-v12',
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

        try {
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
    <div class="relative h-full w-full overflow-hidden rounded-2xl">
        <div id="map-admin" class="h-full w-full"></div>
    </div>
</template>
