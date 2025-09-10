<script setup lang="ts">
import { type PropType } from 'vue'
import {
  DatebornField,
  DeleteField,
  FieldGroup,
  NameField,
  PasswordField,
  PasswordProfileField,
  SelectField,
  TextareaField,
  TextField,
} from '@/@core/components'
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
    case 'update-password':
      return PasswordProfileField
    case 'dateborn':
    case 'date':
      return DatebornField
    case 'delete':
      return DeleteField
    case 'type':
      return SelectField
    case 'description':
      return TextareaField
    default:
      return TextField
  }
}
</script>

<template>
  <ul class="mx-auto mt-5">
    <li
      v-for="field in formFields.filter(
        (f) =>
          ![
            'rain',
            'humidity',
            'probability',
            'duration',
            'atmospheric_pressure',
            'river_discharge',
            'height',
          ].includes(f.id),
      )"
      :key="field.id"
      class="my-3 grid"
    >
      <component :is="getFieldComponent(field)" :field="field" class="w-[332px]" />
    </li>
    <li class="my-3 grid w-[332px]">
      <FieldGroup :fields="formFields.filter((f) => ['rain', 'humidity'].includes(f.id))" />
    </li>
    <li class="my-3 grid w-[332px]">
      <FieldGroup :fields="formFields.filter((f) => ['probability', 'duration'].includes(f.id))" />
    </li>
    <li class="my-3 grid w-[332px]">
      <FieldGroup
        :fields="
          formFields.filter((f) => ['atmospheric_pressure', 'river_discharge'].includes(f.id))
        "
      />
    </li>
    <li class="my-3 grid w-[332px]">
      <FieldGroup :fields="formFields.filter((f) => ['height'].includes(f.id))" />
    </li>
  </ul>

  <button
    :class="formFields.some((f) => f.id === 'delete') ? 'bg-red-500' : 'bg-blue-500'"
    class="mx-auto mt-5 w-[250px] rounded-2xl p-2 font-semibold text-white shadow-xl"
  >
    {{ buttonText }}
  </button>
</template>
