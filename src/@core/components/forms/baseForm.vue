<script setup lang="ts">
import { type PropType } from 'vue'
import { DatebornField, DateField, PasswordField, SelectField, TextField } from './inputs'
import buttonGlassmorphism from '../buttons/buttonGlassmorphism.vue'
import type { IFormField } from '@/@core/interfaces/form'

defineProps({
  formFields: {
    type: Array as PropType<IFormField[]>,
    required: true,
  },
  buttonText: {
    type: String,
    required: false,
  },
})
</script>

<template>
  <ul class="mt-5">
    <li v-for="field in formFields" :key="field.id" class="my-5 grid w-[332px]">
      <PasswordField v-if="field.type === 'password'" :field="field" />
      <TextField v-else-if="field.placeholder" :field="field" />
      <DatebornField v-else-if="field.id === 'dateborn'" :field="field" />
      <DateField v-else-if="field.id === 'date'" :field="field" />
      <SelectField v-else :field="field" />
    </li>
  </ul>

  <buttonGlassmorphism v-if="buttonText" :buttonText="buttonText" />
</template>
