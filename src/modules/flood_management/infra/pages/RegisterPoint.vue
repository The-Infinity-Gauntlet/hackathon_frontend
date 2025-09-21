<script setup lang="ts">
import { ref, onMounted } from 'vue'
import mapboxgl from 'mapbox-gl'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { useNeighborhood } from '@/@core/composables/neighborhood'
import { ProfileForm } from '@/@core/components'
import type { IFormField } from '@/@core/interfaces/form'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY
const { loadNeighborhoods, getNeighborhood } = useNeighborhood()
const neighborhood = ref<string | null>(null)

const fields: IFormField[] = [
    { id: 'latitude', label: 'Latitude', placeholder: 'Digite a latitude aqui', type: 'number' },
    { id: 'longitude', label: 'Longitude', placeholder: 'Digite a longitude aqui', type: 'number' },
    { id: 'city', label: 'Cidade', placeholder: 'Digite a cidade aqui', type: 'text' },
    { id: 'neighborhood', label: 'Bairro', placeholder: 'Digite o bairro aqui', type: 'text' },
    { id: 'rain', label: 'Chuva', placeholder: 'xxx', type: 'number' },
    { id: 'humidity', label: 'Umidade', placeholder: 'xxx', type: 'number' },
    { id: 'atmospheric_pressure', label: 'Pressão', placeholder: 'xxxxxx', type: 'number' },
    { id: 'river_discharge', label: 'Vazão do rio', placeholder: 'xxx', type: 'number' },
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

function handleRegisterPoint(values: Record<string, any>) {
    console.log('RegisterPoint values:', values)
}
</script>

<template>
    <div class="grid justify-center px-5 pt-5 pb-20">
        <h1 class="mb-10 hidden text-center text-2xl font-semibold lg:block">Registrar ponto</h1>
        <div class="h-[350px] overflow-hidden rounded-2xl lg:w-[50vw]">
            <div id="map-register_point" class="h-full w-full"></div>
        </div>
        <ProfileForm :formFields="fields" buttonText="Cadastrar" @submit="handleRegisterPoint" />
    </div>
</template>
