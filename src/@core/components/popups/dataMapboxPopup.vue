<script setup lang="ts">
import FloodAlertMapbox from './floodMapbox/floodAlertMapbox.vue'
import WeatherStatsMapbox from './floodMapbox/weatherStatsMapbox.vue'

const props = defineProps<{
  neighborhood: string
}>()

const location = {
  neighborhood: props.neighborhood,
  city: 'Joinville',
  data: [
    {
      name: 'Probabilidade de enchente',
      icon: '/weather_information/danger.svg',
      scale: 59,
      message: 'CRISE!',
    },
  ] as const,
}
</script>

<template>
  <div
    class="absolute bottom-2 left-4 z-3 w-[90%] rounded-2xl bg-white p-4 shadow-lg dark:bg-[#000d19]"
  >
    <div>
      <h4>{{ location.neighborhood }}</h4>
      <p class="text-xs text-[#999999]">{{ location.city }}, Brasil</p>
    </div>

    <div class="my-2 flex items-center justify-between">
      <FloodAlertMapbox :alert="location.data[0].message" class="w-[50%]" />
      <WeatherStatsMapbox :weatherStats="location.data" class="mx-auto" />
    </div>

    <div class="flex justify-between">
      <button class="mx-auto text-xs">Mudar local</button>
      <hr class="h-5 border border-[#999999]" />
      <button class="mx-auto text-xs">Detalhes</button>
    </div>
  </div>
</template>
