<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ChartItems, FloodAlert, WeatherStatus, MapboxPopup } from '@/@core/components'
import { BlogPost, Mapbox } from '../components'
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
  <div class="grid justify-center px-5">
    <section class="p-5">
      <h1 class="text-4xl font-semibold lg:text-5xl">Bem-vindo ao AQUA!</h1>
    </section>

    <section>
<<<<<<< HEAD
      <div class="flex cursor-pointer items-center justify-center py-5" @click="togglePopup">
=======
      <div class="flex items-center justify-center py-5" @click="togglePopup">
>>>>>>> b7af0da2219448486f2a004193fa7bd39944b902
        <img src="/icons/location.svg" alt="Localização" />
        <p class="font-semibold">{{ location.neighborhood }}, {{ location.city }}</p>
        <span class="material-symbols-outlined pl-2 text-[#999999]">edit_square</span>
      </div>
      <MapboxPopup v-if="showPopup" @close="showPopup = false" />

      <WeatherStatus :weatherStatus="location.data" />
      <FloodAlert :alert="location.data[1].message" />
    </section>

    <Mapbox />
<<<<<<< HEAD
    <ChartItems v-for="item in data.options" :key="item" :item="item" class="-mt-5 lg:hidden" />
=======
    <ChartItems v-for="item in data.options" :key="item" :item="item" class="lg:hidden" />
>>>>>>> b7af0da2219448486f2a004193fa7bd39944b902
    <div class="hidden space-x-5 overflow-x-auto pr-5 lg:grid lg:grid-cols-2 lg:justify-center">
      <ChartItems v-for="item in data.options" :key="item.id" :item="item" />
    </div>
    <BlogPost />
  </div>
</template>
