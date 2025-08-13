<script setup lang="ts">
import themeSwitcher from './themeSwitcher.vue'
import { useNavigation } from '../../composables/navigation'

defineProps<{
  title?: string
}>()

const { routerBack } = useNavigation()
</script>

<template>
  <header class="relative z-10 flex items-center justify-between bg-transparent px-7">
    <button class="material-symbols-outlined text-[#999999]" @click="routerBack">
      arrow_back_ios
    </button>
    <img src="/icons/logo.svg" class="ml-3" />
    <theme-switcher />
  </header>
  <div class="grid">
    <h1 class="text-center">{{ title }}</h1>
  </div>
</template>
