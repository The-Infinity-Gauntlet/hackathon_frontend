<script setup lang="ts">
import { type PropType } from 'vue'
import {
  DatebornField,
  DateField,
  FileField,
  PasswordField,
  SelectField,
  TextareaField,
  TextField,
  ButtonGlassmorphism,
} from '@/@core/components'
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
    case 'state':
      return SelectField
    case 'file':
      return FileField
    case 'description':
      return TextareaField
    default:
      return TextField
  }
}
</script>

<template>
  <ul class="mx-auto mt-5">
    <li v-for="field in formFields" :key="field.id" class="my-5 grid w-[332px]">
      <component :is="getFieldComponent(field)" :field="field" />
    </li>
  </ul>

  <ButtonGlassmorphism v-if="buttonText" :buttonText="buttonText" />
</template>
