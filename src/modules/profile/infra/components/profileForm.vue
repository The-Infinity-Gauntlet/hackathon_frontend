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
</script>

<template>
  <ul class="mt-5">
    <li v-for="field in formFields" :key="field.id" class="my-5 grid w-[332px]">
      <NameField v-if="field.id === 'name'" :field="field" />
      <PasswordField v-else-if="field.id === 'password'" :field="field" />
      <DatebornField v-else-if="field.id === 'dateborn'" :field="field" />
      <DeleteField v-else-if="field.id == 'delete'" :field="field" />
      <TextField v-else :field="field" />
    </li>
  </ul>

  <button
    :class="formFields.some((f) => f.id === 'delete') ? 'bg-red-500' : 'bg-blue-500'"
    class="mx-auto mt-1 w-[250px] rounded-2xl p-2 font-semibold text-white shadow-xl"
  >
    {{ buttonText }}
  </button>
</template>
