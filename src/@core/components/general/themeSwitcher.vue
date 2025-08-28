<script setup lang="ts">
import { useTheme } from '@/@core/composables/useTheme'

const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <button @click="toggleTheme">
    <span
      class="material-symbols-outlined text-gray-500 transition-all duration-300 ease-out"
      :class="[isDark ? 'scale-90 rotate-180 opacity-80' : 'scale-100 rotate-360 opacity-100']"
    >
      {{ isDark ? 'sunny' : 'bedtime' }}
    </span>
  </button>
</template>
