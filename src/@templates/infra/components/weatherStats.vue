<script setup lang="ts">
import type { IWeatherField } from '@/@templates/interfaces/weather'

defineProps({
  weatherStats: {
    type: Array as PropType<IWeatherField[]>,
    required: true,
  },
})
</script>

<template>
  <ul class="flex justify-between bg-[#E5E5E5] dark:bg-[#00182F] p-5 rounded-2xl">
    <li v-for="data in weatherStats" class="grid gap-1 w-[50px] h-auto">
      <img :src="data.icon" :alt="data.name" class="mx-auto" />
      <p class="text-xs text-center text-[#8F9192] dark:text-[#999999]">{{ data.name }}</p>
      <p v-if="data.name == 'Temperatura'" class="text-center font-semibold">{{ data.scale }}°C</p>
      <p v-else class="text-center font-semibold">{{ data.scale }}%</p>
    </li>
  </ul>
</template>
