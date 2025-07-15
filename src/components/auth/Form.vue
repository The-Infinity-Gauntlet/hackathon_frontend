<script setup lang="ts">
import ButtonGlassmorphism from "../ButtonGlassmorphism.vue"

defineProps({
  formFields: {
    type: Array,
    required: true
  },
  text: {
    type: String,
    required: false
  },
});
</script>

<template>
  <ul class="mt-5">
    <li v-for="field in formFields" :key="field.id" class="grid w-[332px] my-5">

      <div v-if="field.placeholder" class="grid gap-2">
        <label :for="field.id">{{ field.label }}</label>
        <input :type="field.type" :id="field.id" :name="field.id" required :placeholder="field.placeholder"
          :autocomplete="field.autocomplete"
          class="border border-[#7AA6C8] px-3 py-3 rounded-lg text-xs text-[#999999] focus:bg-[#7AA6C8]/20">
      </div>

      <div v-else-if="field.id === 'dateborn'" class="grid gap-2">
        <label>{{ field.label }}</label>
        <div class="flex justify-between">
          <select name="day" id="day"
            class="border border-[#7AA6C8] px-3 py-2 rounded-lg text-xs text-[#999999] w-[48%]">
            <option value="">Dia</option>
            <option v-for="day in 31" :key="day" :value="day">{{ day }}</option>
          </select>
          <select name="month" id="month"
            class="border border-[#7AA6C8] px-3 py-2 rounded-lg text-xs text-[#999999] w-[48%]">
            <option value="">Mês</option>
            <option v-for="(option, index) in field.options" :key="option" :value="index + 1">{{ option }}</option>
          </select>
          <select name="year" id="year"
            class="border border-[#7AA6C8] px-3 py-2 rounded-lg text-xs text-[#999999] w-[48%]">
            <option value="">Ano</option>
            <option v-for="year in 100" :key="year" :value="new Date().getFullYear() - year + 1"> {{
              new Date().getFullYear() - year + 1 }}</option>
          </select>
        </div>
      </div>

      <div v-else-if="field.id === 'date'" class="grid gap-2">
        <label>{{ field.label }}</label>
        <div class="flex justify-between">
          <select name="month" id="month"
            class="border border-[#7AA6C8] px-3 py-2 rounded-lg text-xs text-[#999999] w-[48%]">
            <option value="">Mês</option>
            <option v-for="(option, index) in field.options" :key="option" :value="index + 1">{{ option }}</option>
          </select>
          <select name="year" id="year"
            class="border border-[#7AA6C8] px-3 py-2 rounded-lg text-xs text-[#999999] w-[48%]">
            <option value="">Ano</option>
            <option v-for="year in 100" :key="year" :value="new Date().getFullYear() - year + 1"> {{
              new Date().getFullYear() - year + 1 }}</option>
          </select>
        </div>
      </div>


      <div v-else class="grid gap-2">
        <label>{{ field.label }}</label>
        <div class="flex justify-center">
          <select :name="field.autocomplete" :id="field.id"
            class="border border-[#7AA6C8] px-3 py-2 rounded-lg text-xs text-[#999999] w-full">
            <option value="">{{ field.name }}</option>
            <option v-for="(option, index) in field.options" :key="option"
              :value="field.id === 'year' ? option : index + 1">{{ option }}</option>
          </select>
        </div>
      </div>
    </li>
  </ul>

  <ButtonGlassmorphism v-if="text" :text="text" />
</template>
