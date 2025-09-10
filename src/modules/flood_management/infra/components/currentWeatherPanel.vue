<script setup lang="ts">
import { BaseCarousel, ChartItems, WeatherStatus } from '@/@core/components'

defineProps<{
  data: object
  location: object
}>()
</script>

<template>
  <section>
    <div class="my-10 flex justify-center gap-1">
      <p class="font-semibold">{{ location.neighborhood }}, {{ location.city }}</p>
      <span class="material-symbols-outlined text-[#999999]">edit_square</span>
    </div>

    <h2 class="text-2xl font-semibold">Dados atuais</h2>
    <p class="my-2 flex items-center gap-3 text-xs text-[#999999]">
      <span class="material-symbols-outlined">update</span> {{ location.date }}
    </p>

    <WeatherStatus :weatherStatus="location.data" />
    <BaseCarousel :items="data" class="lg:hidden" />
    <div class="hidden space-x-5 overflow-x-auto pr-5 lg:grid lg:grid-cols-2 lg:justify-center">
      <ChartItems v-for="item in data.options" :key="item.id" :item="item" />
    </div>
  </section>
</template>
