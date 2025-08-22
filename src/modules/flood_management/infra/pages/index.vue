<script setup lang="ts">
import { ref } from 'vue'
import { WeatherPanel } from '../components'
import { BaseCarousel, FloodAlert } from '@/@core/components'

const menu = {
  id: 'menu',
  options: [
    { id: 0, label: 'Cadastre um novo ponto de alagamento', icon: 'add', link: '/admin' },
    { id: 1, label: 'Gráficos', icon: 'bar_chart_4_bars', link: '/admin' },
    { id: 2, label: 'Visão Geral', icon: 'travel_explore', link: '/admin' },
    { id: 3, label: 'Histórico de cadastros', icon: 'schedule', link: '/admin' },
    { id: 4, label: 'Emitir Notificação', icon: 'notifications_active', link: '/admin' },
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
          label: 'Vasão do rio',
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
  date: 'Seg, 22:00',
})
</script>

<template>
  <div class="grid justify-center px-5 pb-20">
    <section class="p-5">
      <h1 class="grid gap-3 text-4xl font-semibold">Área de <span>Administração</span></h1>
    </section>

    <section>
      <FloodAlert :alert="location.data[1].message" />
      <BaseCarousel :items="menu" />
    </section>

    <WeatherPanel :data="data" :location="location" />
  </div>
</template>
