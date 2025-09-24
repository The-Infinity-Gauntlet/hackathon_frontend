<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ButtonGlassmorphism, FloodAlert, MapboxPopup } from '@/@core/components'
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
        <section class="-mt-30 flex h-screen items-center justify-between px-5 pt-30">
            <div class="grid w-[50%] gap-2">
                <h1 class="mb-5 grid gap-2 text-6xl font-semibold lg:gap-5 lg:text-8xl">
                    Bem-vindo ao
                    <span class="text-[#2768CA]">AQUA!</span>
                </h1>

                <p class="text-xl font-semibold text-[#999999] lg:text-3xl">
                    Acompanhe em tempo real áreas de risco, probabilidade de alagamentos e câmeras
                    ao vivo. Informação <span class="text-[#2768CA]">rápida</span> e
                    <span class="text-[#2768CA]">confiável</span> para sua segurança.
                </p>

                <RouterLink
                    to="/blog"
                    class="mt-5 block w-[250px] cursor-pointer rounded-lg bg-[#7AA6C8]/30 p-2 text-center font-semibold text-[#2768CA] shadow-xl backdrop-blur-xs lg:w-[300px] lg:p-3 lg:text-2xl"
                >
                    Explorar
                </RouterLink>
            </div>

            <div class="relative">
                <img
                    src="/icons/background-home.svg"
                    alt=""
                    class="absolute -top-120 -right-15 -z-10 hidden h-350 w-350 lg:block"
                />
                <img
                    src="/gifs/home.gif"
                    alt="Animação"
                    class="mr-20 hidden h-120 w-120 lg:block"
                />
            </div>
        </section>

        <section>
            <div
                class="flex cursor-pointer items-center justify-center py-5 lg:text-xl"
                @click="togglePopup"
            >
                <p class="font-semibold">
                    Localização: {{ location.neighborhood }}, {{ location.city }}
                </p>
                <span class="material-symbols-outlined pl-2 text-[#999999]">edit_square</span>
            </div>
            <MapboxPopup v-if="showPopup" @close="showPopup = false" />
            <FloodAlert :alert="location.data[1].message" />
            <Mapbox />
        </section>
    </div>
</template>
