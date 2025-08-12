<script setup lang="ts">
import themeSwitcher from './themeSwitcher.vue'
import { useNavigation } from '../../composables/navigation'

defineProps<{
  title?: string
}>()

const { routerBack } = useNavigation()
</script>

<template>
  <header class="flex items-center justify-between px-7">
    <button class="material-symbols-outlined" @click="routerBack">arrow_back_ios</button>
    <img src="/icons/logo.svg" class="ml-3" />
    <theme-switcher />
  </header>
  <div class="grid">
    <h1 class="text-center">{{ title }}</h1>
  </div>
</template>
