<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <button @click="toggleTheme"
    class="w-14 h-8 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full p-1 transition-all duration-300">
    <div class="w-6 h-6 bg-white dark:bg-gray-800 rounded-full shadow-md transform transition-transform duration-300"
      :class="{ 'translate-x-6': isDark }"></div>
  </button>
</template>