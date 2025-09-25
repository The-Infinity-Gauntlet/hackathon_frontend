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
        <section class="-z-20 -mt-30 flex h-screen items-center justify-between px-5 pt-30">
            <div class="grid w-[50%] gap-2">
                <h1 class="mb-5 grid gap-2 text-4xl font-semibold lg:gap-5 lg:text-6xl xl:text-8xl">
                    Bem-vindo ao
                    <span class="text-[#2768CA]">AQUA!</span>
                </h1>

                <p class="text-xl font-semibold text-[#999999] xl:text-3xl">
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
                    class="absolute -top-120 -right-15 -z-10 hidden lg:block lg:w-200 xl:h-300 xl:w-300 2xl:h-350 2xl:w-350"
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

        <section class="grid gap-10">
            <div
                class="flex items-center justify-between rounded-xl bg-[#F2F7F9] px-20 py-10 dark:bg-[#00182F]"
            >
                <div class="w-[40%]">
                    <h2 class="text-3xl font-semibold">Fique informado!</h2>
                    <p class="my-5 text-xl font-semibold text-[#999999]">
                        As enchentes estão cada vez mais presentes no nosso dia a dia. Aqui você
                        encontra informações simples e práticas para entender as causas, os impactos
                        e, principalmente, como se proteger. Acesse e fique por dentro.
                    </p>
                    <RouterLink
                        to="/blog"
                        class="block w-[250px] cursor-pointer rounded-lg bg-blue-500 p-2 text-center text-lg font-semibold text-white shadow-xl transition-colors duration-300 hover:bg-blue-600"
                    >
                        Informe-se</RouterLink
                    >
                </div>

                <img src="/gifs/blog.gif" alt="Animação" class="h-80 w-120" />
            </div>

            <div class="flex items-center justify-between rounded-xl px-20 py-10">
                <img src="/gifs/donation.gif" alt="Animação" class="h-80 w-120" />

                <div class="w-[40%] text-right">
                    <h2 class="text-3xl font-semibold">Ajude que precisa!</h2>
                    <p class="my-5 text-xl font-semibold text-[#999999]">
                        As enchentes trazem desafios que muitas famílias não conseguem enfrentar
                        sozinhas. Sua doação ajuda a levar alimentos, abrigo e esperança para quem
                        mais precisa. Doe e faça parte dessa mudança..
                    </p>
                    <RouterLink
                        to="/pagamento"
                        class="ml-auto block w-[250px] cursor-pointer rounded-lg bg-blue-500 p-2 text-center text-lg font-semibold text-white shadow-xl transition-colors duration-300 hover:bg-blue-600"
                    >
                        Doe agora</RouterLink
                    >
                </div>
            </div>
        </section>
    </div>
</template>
