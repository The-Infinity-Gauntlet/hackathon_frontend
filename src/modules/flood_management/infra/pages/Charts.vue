<script setup lang="ts">
import { ref } from 'vue'
import { BaseChart } from '@/@core/components'

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

const field = {
  id: 'forecast',
  options: ['1 hora', '3 horas', '6 horas', '12 horas', '1 dia', '2 dias', '3 dias', '7 dias'],
}
</script>

<template>
  <div class="grid px-5 pb-20">
    <section class="p-5">
      <h1 class="grid gap-3 text-4xl font-semibold">Gráficos</h1>
    </section>

    <section>
      <h2 class="text-2xl font-semibold">Dados atuais</h2>
      <p class="my-2 flex items-center gap-3 text-xs text-[#999999]">
        <span class="material-symbols-outlined">update</span> {{ location.date }}
      </p>

      <div class="mt-5">
        <BaseChart v-for="(chart, index) in charts" :key="index" :item="chart" />
      </div>
    </section>

    <section>
      <h2 class="mb-2 text-2xl font-semibold">Previsão</h2>
      <select
        :name="field.autocomplete"
        :id="field.id"
        class="mb-5 w-[35%] rounded-lg bg-[#2768CA] p-2 text-xs font-semibold text-white outline-none"
      >
        <option
          v-for="(option, index) in field.options"
          :key="option"
          :value="field.id === 'year' ? option : index + 1"
          class="bg-white font-semibold text-black dark:bg-[#00182F] dark:text-white"
        >
          {{ option }}
        </option>
      </select>

      <div class="mt-5">
        <BaseChart v-for="(chart, index) in charts" :key="index" :item="chart" />
      </div>
    </section>
  </div>
</template>
