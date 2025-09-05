<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { BaseCarousel } from '@/@core/components'
import { CurrentWeatherPanel, ForecastWeatherPanel, SelectFloodAlert } from '../components'
import { useGeolocationStore } from '@/@core/plugins/registered/pinia/geolocation'

const geolocation = useGeolocationStore()

const menu = {
  id: 'menu',
  options: [
    {
      id: 0,
      label: 'Cadastre um novo ponto de alagamento',
      icon: 'add',
      link: '/admin/mapa-de-alagamento',
    },
    { id: 1, label: 'Gráficos', icon: 'bar_chart_4_bars', link: '/admin/graficos' },
    { id: 2, label: 'Cadastrar ocorrência', icon: 'report', link: '/admin/registrar-ocorrencia' },
    { id: 3, label: 'Histórico de cadastros', icon: 'schedule', link: '/admin/historico' },
    {
      id: 4,
      label: 'Emitir Notificação',
      icon: 'notifications_active',
      link: '/admin/registrar-notificacao',
    },
  ],
}
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
const location = ref({
  neighborhood: null as string | null,
  city: null as string | null,
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
  date: 'Seg, 22:00',
})

onMounted(async () => {
  const currentLocation = await geolocation.findNeighborhood()
  location.value.neighborhood = currentLocation.neighborhood
  location.value.city = currentLocation.city
})
</script>

<template>
  <div class="grid justify-center px-5 pb-20">
    <section class="p-5">
      <h1 class="grid gap-3 text-4xl font-semibold">Área de <span>Administração</span></h1>
    </section>

    <section>
      <SelectFloodAlert :alert="location.data[1].message" />
      <BaseCarousel :items="menu" />
    </section>

    <CurrentWeatherPanel :data="data" :location="location" />
    <ForecastWeatherPanel :data="data" :location="location" />
  </div>
</template>
