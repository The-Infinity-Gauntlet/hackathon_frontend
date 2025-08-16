<script setup lang="ts">
import { type PropType } from 'vue'
import {
  DatebornField,
  DateField,
  FileField,
  PasswordField,
  SelectField,
  TextField,
} from './inputs'
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

const getFieldComponent = (field: IFormField) => {
  switch (field.id) {
    case 'password':
    case 'password-confirm':
      return PasswordField
    case 'text':
      return TextField
    case 'dateborn':
      return DatebornField
    case 'date':
      return DateField
    case 'bank':
    case 'category':
      return SelectField
    case 'file':
      return FileField
    default:
      return TextField
  }
}
</script>

<template>
  <ul class="mt-5">
    <li v-for="field in formFields" :key="field.id" class="my-5 grid w-[332px]">
      <component :is="getFieldComponent(field)" :field="field" />
    </li>
  </ul>

  <buttonGlassmorphism v-if="buttonText" :buttonText="buttonText" />
</template>
