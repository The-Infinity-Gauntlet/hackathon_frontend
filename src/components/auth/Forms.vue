<script setup lang="ts">
import Button from "../Button.vue"

defineProps({
  formFields: {
    type: Array,
    required: true
  },
  text: {
    type: String,
    required: true
  },
});
</script>

<template>
  <img src="/processo.png" class="mx-auto my-10">

  <div v-for="field in formFields" :key="field.id" class="grid w-[332px] my-3">
    <div v-if="field.placeholder" class="grid gap-2">
      <label :for="field.id">{{ field.label }}</label>
      <input :type="field.type" :id="field.id" :name="field.id" required :placeholder="field.placeholder"
        :autocomplete="field.autocomplete" class="border border-[#7AA6C8] px-3 py-2 rounded-lg text-xs text-[#999999]">
    </div>

    <div v-else class="grid gap-2">
      <label>{{ field.label }}</label>
      <div class=" flex justify-center">
        <select name="month" id="month"
          class="border border-[#7AA6C8] px-3 py-2 rounded-lg text-xs text-[#999999] w-[30%]">
          <option value="">Mês</option>
          <option v-for="(month, index) in field.months" :key="month" :value="index + 1">{{ month }}</option>
        </select>
        <select name="year" id="year"
          class="border border-[#7AA6C8] px-3 py-2 rounded-lg text-xs text-[#999999] w-[30%]">
          <option value="">Ano</option>
          <option v-for="year in 100" :key="year" :value="new Date().getFullYear() - year + 1">{{ new
            Date().getFullYear() - year + 1 }}</option>
        </select>
      </div>
    </div>
  </div>

  <Button :text="text" />
</template>
