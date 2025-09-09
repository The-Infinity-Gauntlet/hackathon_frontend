<script setup lang="ts">
import { HeaderComp, MobileMenu } from '@/@core/components'
</script>

<template>
  <div>
    <div class="relative mb-8 h-40">
      <img src="/layouts/wavesMobile.svg" alt="Ondas" class="absolute inset-0 h-full w-full object-cover lg:hidden" />
      <img src="/layouts/wavesProfile.svg" alt="Ondas"
        class="absolute inset-0 h-full w-full object-cover hidden lg:block" />
      <HeaderComp :title="$route.name" />
    </div>

    <RouterView v-slot="{ Component }">
      <Transition mode="out-in" enter-active-class="transition duration-300 ease-out"
        leave-active-class="transition duration-200 ease-in" enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0" leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-4">
        <component :is="Component" :key="$route.fullPath" />
      </Transition>
    </RouterView>
    <MobileMenu class="fixed bottom-0 lg:hidden" />
  </div>
</template>
