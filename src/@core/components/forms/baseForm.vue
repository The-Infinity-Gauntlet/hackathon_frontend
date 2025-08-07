<script setup lang="ts">
import { type PropType, ref } from 'vue'
import buttonGlassmorphism from '../buttons/buttonGlassmorphism.vue'
import type { IFormField } from '@/modules/auth/interfaces/auth'

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

// Track password visibility state for each password field
const passwordVisibility = ref<Record<string, boolean>>({})

// Toggle password visibility
const togglePasswordVisibility = (fieldId: string) => {
  passwordVisibility.value[fieldId] = !passwordVisibility.value[fieldId]
}
</script>

<template>
  <ul class="mt-5">
    <li v-for="field in formFields" :key="field.id" class="my-5 grid w-[332px]">
      <div v-if="field.type === 'password'" class="grid gap-2">
        <label :for="field.id">{{ field.label }}</label>
        <div class="relative">
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
            {{ passwordVisibility[field.id] ? 'visibility_off' : 'visibility' }}
          </span>
        </div>
      </div>

      <div v-else-if="field.placeholder" class="grid gap-2">
        <label :for="field.id">{{ field.label }}</label>
        <input
          :type="field.type"
          :id="field.id"
          :name="field.id"
          required
          :placeholder="field.placeholder"
          :autocomplete="field.autocomplete"
          class="rounded-lg border border-[#7AA6C8] px-3 py-3 text-xs text-black outline-none focus:bg-[#7AA6C8]/20 dark:text-[#999999]"
        />
      </div>

      <div v-else-if="field.id === 'dateborn'" class="grid gap-2">
        <label>{{ field.label }}</label>
        <div class="flex justify-between">
          <select
            name="day"
            id="day"
            class="w-[48%] rounded-lg border border-[#7AA6C8] px-3 py-2 text-xs text-black outline-none dark:text-[#999999]"
          >
            <option value="">Dia</option>
            <option v-for="day in 31" :key="day" :value="day">{{ day }}</option>
          </select>
          <select
            name="month"
            id="month"
            class="w-[48%] rounded-lg border border-[#7AA6C8] px-3 py-2 text-xs text-black outline-none dark:text-[#999999]"
          >
            <option value="">Mês</option>
            <option v-for="(option, index) in field.options" :key="option" :value="index + 1">
              {{ option }}
            </option>
          </select>
          <select
            name="year"
            id="year"
            class="w-[48%] rounded-lg border border-[#7AA6C8] px-3 py-2 text-xs text-black outline-none dark:text-[#999999]"
          >
            <option value="">Ano</option>
            <option v-for="year in 100" :key="year" :value="new Date().getFullYear() - year + 1">
              {{ new Date().getFullYear() - year + 1 }}
            </option>
          </select>
        </div>
      </div>

      <div v-else-if="field.id === 'date'" class="grid gap-2">
        <label>{{ field.label }}</label>
        <div class="flex justify-between">
          <select
            name="month"
            id="month"
            class="w-[48%] rounded-lg border border-[#7AA6C8] px-3 py-2 text-xs text-black outline-none dark:text-[#999999]"
          >
            <option value="">Mês</option>
            <option v-for="(option, index) in field.options" :key="option" :value="index + 1">
              {{ option }}
            </option>
          </select>
          <select
            name="year"
            id="year"
            class="w-[48%] rounded-lg border border-[#7AA6C8] px-3 py-2 text-xs text-black outline-none dark:text-[#999999]"
          >
            <option value="">Ano</option>
            <option v-for="year in 100" :key="year" :value="new Date().getFullYear() - year + 1">
              {{ new Date().getFullYear() - year + 1 }}
            </option>
          </select>
        </div>
      </div>

      <div v-else class="grid gap-2">
        <label>{{ field.label }}</label>
        <div class="flex justify-center">
          <select
            :name="field.autocomplete"
            :id="field.id"
            class="w-full rounded-lg border border-[#7AA6C8] px-3 py-2 text-xs text-black outline-none dark:text-[#999999]"
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
    </li>
  </ul>

  <buttonGlassmorphism v-if="buttonText" :buttonText="buttonText" />
</template>
