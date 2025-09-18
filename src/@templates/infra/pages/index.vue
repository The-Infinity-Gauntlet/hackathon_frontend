<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  ChartItems,
  CurrentWeatherPanel,
  FloodAlert,
  ForecastWeatherPanel,
  MapboxPopup,
} from '@/@core/components'
import { useTheme } from '@/@core/composables/useTheme'
import { BlogPost, Mapbox } from '../components'
import { useGeolocationStore } from '@/@core/plugins/registered/pinia/geolocation'

const showPopup = ref(false)
const togglePopup = () => (showPopup.value = !showPopup.value)
const geolocation = useGeolocationStore()
const { isDark } = useTheme()

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

const data = {
  id: 'charts',
  options: [
    {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
      datasets: [
        {
          label: 'Precipitação',
          data: [12, 19, 3, 5, 2],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    },
    {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
      datasets: [
        {
          label: 'Vazão do rio',
          data: [12, 19, 3, 5, 2],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    },
    {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
      datasets: [
        {
          label: 'Umidade do ar',
          data: [12, 19, 3, 5, 2],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    },
    {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
      datasets: [
        {
          label: 'Pressão atmosférica',
          data: [12, 19, 3, 5, 2],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    },
  ],
}

onMounted(async () => {
  const currentLocation = await geolocation.findNeighborhood()
  location.value.neighborhood = currentLocation.neighborhood
  location.value.city = currentLocation.city
})
</script>

<template>
  <div>
    <section class="flex items-center justify-between p-5">
      <div class="grid gap-2 text-4xl font-semibold lg:gap-5 lg:text-5xl">
        <h1>Bem-vindo ao</h1>
        <h1>AQUA!</h1>
      </div>

      <img
        v-if="isDark"
        src="/gifs/home-dark.gif"
        alt="Animação"
        class="mr-20 hidden h-70 w-70 lg:block"
      />
      <img
        v-else
        src="/gifs/home-light.gif"
        alt="Animação"
        class="mr-20 hidden h-70 w-70 lg:block"
      />
    </section>

    <section>
      <div
        class="flex cursor-pointer items-center justify-center py-5 lg:text-xl"
        @click="togglePopup"
      >
        <img src="/icons/location.svg" alt="Localização" />
        <p class="font-semibold">{{ location.neighborhood }}, {{ location.city }}</p>
        <span class="material-symbols-outlined pl-2 text-[#999999]">edit_square</span>
      </div>
      <MapboxPopup v-if="showPopup" @close="showPopup = false" />

      <FloodAlert :alert="location.data[1].message" />
    </section>

    <Mapbox />
    <CurrentWeatherPanel :data="data" :location="location" />
    <ForecastWeatherPanel :data="data" :location="location" />
  </div>
</template>
