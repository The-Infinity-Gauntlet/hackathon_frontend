<script setup lang="ts">
import FloodAlertMapbox from './floodMapbox/floodAlertMapbox.vue'
import WeatherStatsMapbox from './floodMapbox/weatherStatsMapbox.vue'

const props = defineProps<{
  neighborhood: string
  city: string
}>()

const location = {
  neighborhood: props.neighborhood,
  city: props.city,
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
<<<<<<< HEAD
    class="absolute right-4 bottom-2 z-3 w-[96%] rounded-2xl bg-white p-4 shadow-lg lg:w-[36.458vw] dark:bg-[#000d19]">
=======
    class="absolute right-4 bottom-2 z-3 w-[96%] rounded-2xl bg-white p-4 shadow-lg lg:w-[36.458vw] dark:bg-[#000d19]"
  >
>>>>>>> b7af0da2219448486f2a004193fa7bd39944b902
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
