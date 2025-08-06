<script setup lang="ts">
defineProps<{
  buttonText: string
}>()
</script>

<template>
  <button
    class="w-[250px] backdrop-blur-xs border border-transparent bg-[#7AA6C8]/30 shadow-xl rounded-2xl font-semibold p-2 mt-10 mx-auto hover:border-[#2768CA] dark:hover:border-[#FFFFFF]"
  >
    {{ buttonText }}
  </button>
</template>
