<script setup lang="ts">
import { BaseCarousel, WeatherStatus, SelectField } from '@/@core/components'

defineProps<{
  data: object
  location: object
}>()

const field = {
  id: 'forecast',
  options: ['1 hora', '3 horas', '6 horas', '12 horas', '1 dia', '2 dias', '3 dias', '7 dias'],
}
</script>

<template>
  <section class="mt-10">
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

    <WeatherStatus :weatherStatus="location.data" />
    <BaseCarousel :items="data" />
  </section>
</template>
