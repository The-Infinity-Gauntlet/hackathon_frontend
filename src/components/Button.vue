<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <button class="backdrop-blur-xs bg-[#7AA6C8]/30 shadow-xl rounded-2xl font-semibold p-2 mt-10">{{ text }}</button>
</template>
