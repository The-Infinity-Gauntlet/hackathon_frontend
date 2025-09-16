<script setup lang="ts">
import { HeaderComp, MobileMenu } from '@/@core/components'
</script>

<template>
  <div class="relative overflow-hidden lg:h-screen">
    <HeaderComp :title="$route.name" />
    <RouterView v-slot="{ Component }">
      <Transition
        mode="out-in"
        enter-active-class="transition duration-300 ease-out"
        leave-active-class="transition duration-200 ease-in"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-4"
      >
        <component
          :is="Component"
          :key="$route.fullPath"
          class="grid px-5 pb-20 sm:px-10 md:px-15 lg:px-20 xl:px-25"
        />
      </Transition>
    </RouterView>

    <div
      class="absolute inset-0 -bottom-350 -z-10 bg-cover bg-center lg:hidden"
      style="background-image: url('/layouts/wavesMobile.svg')"
      aria-hidden="true"
    ></div>

    <div
      v-if="$route.name == 'Cadastro'"
      class="absolute inset-0 -left-400 -z-10 hidden bg-cover bg-center lg:block"
      style="background-image: url('/layouts/wavesAuth.svg'); transform: scaleX(-1)"
      aria-hidden="true"
    ></div>

    <div
      v-else
      class="absolute inset-0 -right-400 -z-10 hidden bg-cover bg-center lg:block"
      style="background-image: url('/layouts/wavesAuth.svg')"
      aria-hidden="true"
    ></div>
    <MobileMenu class="fixed bottom-0 lg:hidden" />
  </div>
</template>
