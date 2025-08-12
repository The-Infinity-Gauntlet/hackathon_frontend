<script setup lang="ts">
import { ref } from 'vue'
import FloodAlert from '@/@core/components/flood/floodAlert.vue'
import Chart from 'primevue/chart'

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
    { name: 'Umidade', icon: '/weather_information/no_rain.svg', scale: 73 },
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
  <div class="grid justify-center px-5 pb-20">
    <FloodAlert :alert="location.data[1].message" />
    <Chart type="bar" :data="chartData" :options="chartOptions" class="mb-10" />
    <Chart type="bar" :data="chartData" :options="chartOptions" class="mb-10" />
    <Chart type="doughnut" :data="chartData" :options="chartOptions" class="mb-10" />
  </div>
</template>
