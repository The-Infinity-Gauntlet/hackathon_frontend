<script setup lang="ts">
import { ref } from 'vue'
import Chart from 'primevue/chart'
import { FloodAlert, WeatherStatus } from '@/@core/components'
import { BlogPost, Mapbox } from '../components'

const location = ref({
  neighborhood: 'Floresta',
  city: 'Joinville',
  data: [
    { name: 'Temperatura', icon: '/weather_information/cloud.svg', scale: 23 },
    {
      name: 'Probabilidade de enchente',
      icon: '/weather_information/danger.svg',
      scale: 59,
      message: 'NORMALIDADE!',
    },
    { name: 'Vazão do rio', icon: '/weather_information/river_discharge.svg', scale: 46 },
  ] as const,
})
const chartData = ref({
  labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
  datasets: [
    {
      label: 'Vendas',
      data: [12, 19, 3, 5, 2],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
  ],
})
const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: '#495057',
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#495057',
      },
      grid: {
        color: '#ebedef',
      },
    },
    y: {
      ticks: {
        color: '#495057',
      },
      grid: {
        color: '#ebedef',
      },
    },
  },
})
</script>

<template>
  <div class="grid justify-center px-5">
    <section class="p-5">
      <h1 class="text-4xl font-semibold">Bem-vindo ao AQUA!</h1>
    </section>

    <section>
      <div class="flex items-center justify-center gap-1 p-5">
        <img src="/icons/location.svg" alt="Localização" />
        <p class="font-semibold">{{ location.neighborhood }}, {{ location.city }}</p>
        <span class="material-symbols-outlined text-[#999999]">edit_square</span>
      </div>

      <WeatherStatus :weatherStatus="location.data" />
      <FloodAlert :alert="location.data[1].message" />
    </section>

    <Mapbox />

    <Chart type="bar" :data="chartData" :options="chartOptions" class="mb-10" />
    <Chart type="bar" :data="chartData" :options="chartOptions" class="mb-10" />
    <Chart type="bar" :data="chartData" :options="chartOptions" class="mb-10" />
    <Chart type="bar" :data="chartData" :options="chartOptions" class="mb-10" />

    <BlogPost />
  </div>
</template>
