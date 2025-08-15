<script setup lang="ts">
defineProps({
  buttonText: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <button
    class="mx-auto mt-2 w-[250px] rounded-2xl bg-blue-500 p-2 font-semibold text-white shadow-xl"
  >
    {{ buttonText }}
  </button>
</template>
