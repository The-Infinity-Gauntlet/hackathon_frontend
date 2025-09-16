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
    <label :for="field.id">{{ field.label }}</label>
<<<<<<< HEAD
    <input :type="field.type" :id="field.id" :name="field.id" required :placeholder="field.placeholder"
      :autocomplete="field.autocomplete"
      class="w-full rounded-lg border border-[#7AA6C8] px-3 py-3 text-xs text-black outline-none focus:bg-[#7AA6C8]/20 dark:text-[#999999]" />
=======
    <input
      :type="field.type"
      :id="field.id"
      :name="field.id"
      required
      :placeholder="field.placeholder"
      :autocomplete="field.autocomplete"
      class="w-full rounded-lg border border-[#7AA6C8] px-3 py-3 text-xs text-black outline-none focus:bg-[#7AA6C8]/20 dark:text-[#999999]"
    />
>>>>>>> b7af0da2219448486f2a004193fa7bd39944b902
  </div>
</template>
