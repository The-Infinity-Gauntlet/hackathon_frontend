<script setup lang="ts">
import themeSwitcher from './themeSwitcher.vue'
import { useNavigation } from '../../composables/navigation'

defineProps<{
  title?: string
}>()

const { routerBack } = useNavigation()
</script>

<template>
  <header class="flex justify-between items-center px-7">
    <button class="material-symbols-outlined" @click="routerBack">arrow_back_ios</button>
    <img src="/icons/logo.svg" class="ml-10" />
    <theme-switcher />
  </header>
  <h1 class="text-center">{{ title }}</h1>
</template>
