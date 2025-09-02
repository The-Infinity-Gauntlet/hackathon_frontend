<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { BaseChart, FloodAlert, WeatherStatus, MapboxPopup } from '@/@core/components'
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
const charts = [
  {
    type: 'bar',
    data: {
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
  },
  {
    type: 'bar',
    data: {
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
  },
  {
    type: 'bar',
    data: {
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
  },
  {
    type: 'bar',
    data: {
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
  },
]

onMounted(async () => {
  const currentLocation = await geolocation.findNeighborhood()
  location.value.neighborhood = currentLocation.neighborhood
  location.value.city = currentLocation.city
})
</script>

<template>
  <div class="grid justify-center px-5">
    <section class="p-5">
      <h1 class="text-4xl font-semibold">Bem-vindo ao AQUA!</h1>
    </section>

    <section>
      <div class="flex items-center justify-center py-5" @click="togglePopup">
        <img src="/icons/location.svg" alt="Localização" />
        <p class="font-semibold">{{ location.neighborhood }}, {{ location.city }}</p>
        <span class="material-symbols-outlined pl-2 text-[#999999]">edit_square</span>
      </div>
      <MapboxPopup v-if="showPopup" @close="showPopup = false" />

      <WeatherStatus :weatherStatus="location.data" />
      <FloodAlert :alert="location.data[1].message" />
    </section>

    <Mapbox />
    <BaseChart v-for="(chart, index) in charts" :key="index" :item="chart" />
    <BlogPost />
  </div>
</template>
