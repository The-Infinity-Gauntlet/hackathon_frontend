<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
    ButtonGlassmorphism,
    FloodAlert,
    MapboxPopup,
} from '@/@core/components'
import { Mapbox } from '../components'
import { useGeolocationStore } from '@/@core/plugins/registered/pinia/geolocation'

const showPopup = ref(false)
const togglePopup = () => (showPopup.value = !showPopup.value)
const geolocation = useGeolocationStore()

const location = ref({
    neighborhood: null as string | null,
    city: null as string | null,
    data: [
        { name: 'Temperatura', icon: '/weather_information/cloud.svg', scale: 23 },
        {
            name: 'Probabilidade de enchente',
            icon: '/weather_information/danger.svg',
            scale: 59,
            message: 'CRISE!',
        },
        { name: 'Vazão do rio', icon: '/weather_information/river_discharge.svg', scale: 46 },
    ] as const,
    date: 'Seg, 22:00',
})

onMounted(async () => {
    const currentLocation = await geolocation.findNeighborhood()
    location.value.neighborhood = currentLocation.neighborhood
    location.value.city = currentLocation.city
})
</script>

<template>
    <div>
        <section class="flex justify-between items-center px-5 pt-30 h-screen -mt-30">
            <div class="w-[50%] grid gap-2">
                <h1 class="grid gap-2 text-6xl font-semibold mb-5 lg:gap-5 lg:text-8xl">Bem-vindo ao
                    <span class="text-[#2768CA]">AQUA!</span>
                </h1>

                <p class="text-[#999999] font-semibold text-xl lg:text-3xl">Acompanhe em tempo real áreas de risco,
                    probabilidade
                    de alagamentos e câmeras ao vivo. Informação <span class="text-[#2768CA]">rápida</span> e
                    <span class="text-[#2768CA]">confiável</span> para sua segurança.
                </p>

                <RouterLink to="/blog"
                    class="text-center mt-5 block w-[250px] lg:w-[300px] text-[#2768CA] cursor-pointer rounded-lg bg-[#7AA6C8]/30 p-2 lg:p-3 font-semibold shadow-xl backdrop-blur-xs lg:text-2xl">
                    Explorar
                </RouterLink>
            </div>

            <div class="relative">
                <img src="/icons/background-home.svg" alt=""
                    class="hidden lg:block absolute -z-10 h-350 w-350 -top-120 -right-15" />
                <img src="/gifs/home.gif" alt="Animação" class="mr-20 hidden h-120 w-120 lg:block" />
            </div>
        </section>

        <section>
            <div class="flex cursor-pointer items-center justify-center py-5 lg:text-xl" @click="togglePopup">
                <p class="font-semibold">Localização: {{ location.neighborhood }}, {{ location.city }}</p>
                <span class="material-symbols-outlined pl-2 text-[#999999]">edit_square</span>
            </div>
            <MapboxPopup v-if="showPopup" @close="showPopup = false" />
            <Mapbox />
            <FloodAlert :alert="location.data[1].message" />
        </section>
    </div>
</template>
