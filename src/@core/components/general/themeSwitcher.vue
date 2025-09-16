<script setup lang="ts">
import { useTheme } from '@/@core/composables/useTheme'

const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <button @click="toggleTheme">
<<<<<<< HEAD
    <span class="material-symbols-outlined text-gray-500 transition-all duration-300 ease-out" :class="[
      isDark
        ? 'scale-90 rotate-180 opacity-80 lg:scale-110'
        : 'scale-100 rotate-360 opacity-100 lg:scale-120',
    ]">
=======
    <span
      class="material-symbols-outlined text-gray-500 transition-all duration-300 ease-out"
      :class="[isDark ? 'scale-90 rotate-180 opacity-80' : 'scale-100 rotate-360 opacity-100']"
    >
>>>>>>> b7af0da2219448486f2a004193fa7bd39944b902
      {{ isDark ? 'sunny' : 'bedtime' }}
    </span>
  </button>
</template>
