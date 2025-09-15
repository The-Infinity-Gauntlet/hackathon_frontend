<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)

function simulateRequest() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

<template>
  <button
    @click="simulateRequest"
    class="rounded bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600"
  >
    Simular carregamento
  </button>
  <div
    v-if="loading"
    class="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-[#0f172a]/80"
  >
    <div
      class="h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"
    ></div>
  </div>
</template>
