<script setup lang="ts">
import { type PropType } from 'vue'
import type { IFormField } from '@/@core/interfaces/form'

defineProps({
  field: {
    type: Object as PropType<IFormField>,
    required: true,
  },
})
</script>

<template>
  <div class="grid gap-2">
    <label>{{ field.label }}</label>
    <div class="flex justify-between">
<<<<<<< HEAD
      <select name="day" id="day"
        class="w-[48%] rounded-lg border border-[#7AA6C8] px-3 py-2 text-xs text-[#999999] outline-none">
        <option value="">Dia</option>
        <option v-for="day in 31" :key="day" :value="day">{{ day }}</option>
      </select>
      <select name="month" id="month"
        class="w-[48%] rounded-lg border border-[#7AA6C8] px-3 py-2 text-xs text-[#999999] outline-none">
=======
      <select
        name="day"
        id="day"
        class="w-[48%] rounded-lg border border-[#7AA6C8] px-3 py-2 text-xs text-[#999999] outline-none"
      >
        <option value="">Dia</option>
        <option v-for="day in 31" :key="day" :value="day">{{ day }}</option>
      </select>
      <select
        name="month"
        id="month"
        class="w-[48%] rounded-lg border border-[#7AA6C8] px-3 py-2 text-xs text-[#999999] outline-none"
      >
>>>>>>> b7af0da2219448486f2a004193fa7bd39944b902
        <option value="">Mês</option>
        <option v-for="(option, index) in field.options" :key="option" :value="index + 1">
          {{ option }}
        </option>
      </select>
<<<<<<< HEAD
      <select name="year" id="year"
        class="w-[48%] rounded-lg border border-[#7AA6C8] px-3 py-2 text-xs text-[#999999] outline-none">
=======
      <select
        name="year"
        id="year"
        class="w-[48%] rounded-lg border border-[#7AA6C8] px-3 py-2 text-xs text-[#999999] outline-none"
      >
>>>>>>> b7af0da2219448486f2a004193fa7bd39944b902
        <option value="">Ano</option>
        <option v-for="year in 100" :key="year" :value="new Date().getFullYear() - year + 1">
          {{ new Date().getFullYear() - year + 1 }}
        </option>
      </select>
    </div>
  </div>
</template>
