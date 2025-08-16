<script setup lang="ts">
import { type PropType } from 'vue'
import { DeleteField, NameField, PasswordField } from './fields'
import { DatebornField, TextField } from '@/@core/components/forms/inputs'
import type { IFormField } from '@/@core/interfaces/form'

defineProps({
  formFields: {
    type: Object as PropType<IFormField[]>,
    required: true,
  },
  buttonText: {
    type: String,
    required: false,
  },
})

const getFieldComponent = (field: IFormField) => {
  switch (field.id) {
    case 'name':
      return NameField
    case 'password':
      return PasswordField
    case 'dateborn':
      return DatebornField
    case 'delete':
      return DeleteField
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

  <button
    :class="formFields.some((f) => f.id === 'delete') ? 'bg-red-500' : 'bg-blue-500'"
    class="mx-auto mt-1 w-[250px] rounded-2xl p-2 font-semibold text-white shadow-xl"
  >
    {{ buttonText }}
  </button>
</template>
