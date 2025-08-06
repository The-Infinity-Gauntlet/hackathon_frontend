<script setup lang="ts">
import { useTheme } from '../../composables/useTheme'

const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <button @click="toggleTheme">
    <span
      class="material-symbols-outlined text-gray-500 transition-all duration-300 ease-out"
      :class="[isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-90 rotate-180 opacity-80']"
    >
      {{ isDark ? 'bedtime' : 'sunny' }}
    </span>
  </button>
</template>
