<script setup lang="ts">
import { HeaderComp, MobileMenu } from '@/@core/components'
</script>

<template>
  <div>
    <HeaderComp :title="$route.name" />
    <RouterView v-slot="{ Component }" class="mt-8">
<<<<<<< HEAD
      <Transition mode="out-in" enter-active-class="transition duration-300 ease-out"
        leave-active-class="transition duration-200 ease-in" enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0" leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-4">
        <component :is="Component" :key="$route.fullPath" class="grid px-5 pb-20 sm:px-10 md:px-15 lg:px-20 xl:px-25" />
=======
      <Transition
        mode="out-in"
        enter-active-class="transition duration-300 ease-out"
        leave-active-class="transition duration-200 ease-in"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-4"
      >
        <component :is="Component" :key="$route.fullPath" />
>>>>>>> b7af0da2219448486f2a004193fa7bd39944b902
      </Transition>
    </RouterView>
    <MobileMenu class="fixed bottom-0 lg:hidden" />
  </div>
</template>
