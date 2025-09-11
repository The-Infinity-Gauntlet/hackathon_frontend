<script setup lang="ts">
import { type PropType } from 'vue'
import type { IFormField } from '@/@core/interfaces/form'
import { TextField } from '@/@core/components'

defineProps({
  fields: {
    type: Array as PropType<IFormField[]>,
    required: true,
  },
})
</script>

<template>
  <div class="flex justify-center gap-3">
    <TextField v-for="field in fields" :key="field.id" :field="field" />
  </div>
</template>
