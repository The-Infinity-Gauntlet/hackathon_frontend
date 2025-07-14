<script setup lang="ts">
import ThemeSwitcher from '../ThemeSwitcher.vue'
import { useRouterBack } from '@/composables/routerBack'

defineProps<{
  title: string
}>()

const { routerBack } = useRouterBack()
</script>

<template>
  <header class="flex justify-between items-center">
    <button class="material-symbols-outlined" @click="routerBack">arrow_back_ios</button>
    <img src="/logo.png" class="ml-10" />
    <theme-switcher />
  </header>
  <h1 class="text-center">{{ title }}</h1>
</template>