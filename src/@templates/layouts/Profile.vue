<script setup lang="ts">
import headerComp from '@/@core/components/general/headerComp.vue'
import mobileMenu from '@/@core/components/general/mobileMenu.vue'
</script>

<template>
  <div>
    <div class="relative mb-8 h-40">
      <img
        src="/layouts/waves.svg"
        alt="Fundo decorativo"
        class="absolute inset-0 h-full w-full object-cover"
      />
      <headerComp :title="$route.name" />
    </div>

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
        <component :is="Component" :key="$route.fullPath" />
      </Transition>
    </RouterView>
    <mobileMenu class="fixed bottom-0" />
  </div>
</template>
