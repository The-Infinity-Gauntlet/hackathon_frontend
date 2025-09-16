<script setup lang="ts">
import { type PropType, ref } from 'vue'
import type { IFormField } from '@/@core/interfaces/form'

defineProps({
  field: {
    type: Object as PropType<IFormField>,
    required: true,
  },
})

// Track password visibility state for each password field
const passwordVisibility = ref<Record<string, boolean>>({})

// Toggle password visibility
const togglePasswordVisibility = (fieldId: string) => {
  passwordVisibility.value[fieldId] = !passwordVisibility.value[fieldId]
}
</script>

<template>
  <div class="grid gap-2">
    <label :for="field.id">{{ field.label }}</label>
    <div class="relative">
<<<<<<< HEAD
      <input :type="passwordVisibility[field.id] ? 'text' : 'password'" :id="field.id" :name="field.id" required
        :placeholder="field.placeholder" :autocomplete="field.autocomplete"
        class="w-full rounded-lg border border-[#7AA6C8] px-3 py-3 text-xs text-black outline-none focus:bg-[#7AA6C8]/20 dark:text-[#999999]" />
      <span @click="togglePasswordVisibility(field.id)"
        class="material-symbols-outlined absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-[#999999]">
=======
      <input
        :type="passwordVisibility[field.id] ? 'text' : 'password'"
        :id="field.id"
        :name="field.id"
        required
        :placeholder="field.placeholder"
        :autocomplete="field.autocomplete"
        class="w-full rounded-lg border border-[#7AA6C8] px-3 py-3 text-xs text-black outline-none focus:bg-[#7AA6C8]/20 dark:text-[#999999]"
      />
      <span
        @click="togglePasswordVisibility(field.id)"
        class="material-symbols-outlined absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-[#999999]"
      >
>>>>>>> b7af0da2219448486f2a004193fa7bd39944b902
        {{ passwordVisibility[field.id] ? 'visibility_off' : 'visibility' }}
      </span>
    </div>
  </div>
</template>
