<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
</script>

<template>
  <div v-if="loading" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
  </div>
</template>