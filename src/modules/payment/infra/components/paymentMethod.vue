<script setup lang="ts">
defineProps({
  formFields: {
    type: Array,
    required: true
  },
});
</script>

<template>
  <div class="grid w-[332px] gap-5 my-10">
    <div v-for="field of formFields" :key="field.id"
      class="flex justify-center dark:bg-[#00182F] rounded-2xl shadow-lg p-3 py-5 gap-5">
      <img :src="field.icon" :alt="field.name">
      <p>{{ field.name }}</p>
    </div>
  </div>
</template>