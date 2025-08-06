<script setup lang="ts">
defineProps({
  formFields: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="my-10 grid w-[332px] gap-5">
    <div
      v-for="field of formFields"
      :key="field.id"
      class="flex justify-center gap-5 rounded-2xl p-3 py-5 shadow-lg dark:bg-[#00182F]"
    >
      <img :src="field.icon" :alt="field.name" />
      <p>{{ field.name }}</p>
    </div>
  </div>
</template>
