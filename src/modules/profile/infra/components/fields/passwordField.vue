<script setup lang="ts">
import { PasswordField } from '@/@core/components/forms/inputs'

defineProps({
  field: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="grid gap-2">
    <p>{{ field.label }}</p>
    <div v-for="field in field.fields">
      <PasswordField :field="field" />
    </div>
  </div>
</template>
