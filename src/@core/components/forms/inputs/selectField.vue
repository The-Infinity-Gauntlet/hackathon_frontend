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
    <div class="flex justify-center">
      <select
        :name="field.autocomplete"
        :id="field.id"
        class="w-full rounded-lg border border-[#7AA6C8] px-3 py-2 text-xs text-[#999999] outline-none"
      >
        <option value="">{{ field.name }}</option>
        <option
          v-for="(option, index) in field.options"
          :key="option"
          :value="field.id === 'year' ? option : index + 1"
        >
          {{ option }}
        </option>
      </select>
    </div>
  </div>
</template>
