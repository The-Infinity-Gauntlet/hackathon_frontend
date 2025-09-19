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
const emit = defineEmits(['submit'])
const modelValue = defineModel<Record<string, any>>({ required: true })

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
            'city',
            'region',
            'neighborhood',
            'possibility',
            'created_at',
            'finished_at',
          ].includes(f.id),
      )"
      :key="field.id"
      class="my-3 grid"
    >
      <component :is="getFieldComponent(field)" :field="field" v-model="modelValue" class="w-[332px]" />
    </li>
    <li class="my-3 grid w-[332px]">
      <FieldGroup :fields="formFields.filter((f) => ['city', 'region'].includes(f.id))" v-model="modelValue" />
    </li>
    <li class="my-3 grid w-[332px]">
      <FieldGroup :fields="formFields.filter((f) => ['neighborhood', 'possibility'].includes(f.id))"v-model="modelValue" />
    </li>
    <li class="my-3 grid w-[332px]">
      <FieldGroup
        :fields="
          formFields.filter((f) => ['created_at', 'finished_at'].includes(f.id))
        "
        v-model="modelValue"
      />
    </li>
    <!--<li class="my-3 grid w-[332px]">
      <FieldGroup :fields="formFields.filter((f) => ['height'].includes(f.id))" />
    </li>-->
  </ul>

  <button
    :class="formFields.some((f) => f.id === 'delete') ? 'bg-red-500' : 'bg-blue-500'"
    class="mx-auto mt-5 w-[250px] rounded-2xl p-2 font-semibold text-white shadow-xl"
    @click="emit('submit')"
  >
    {{ buttonText }}
  </button>
</template>
