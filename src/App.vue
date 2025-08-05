<script setup lang="ts">
import 'reflect-metadata'
import headerComp from '@/@core/components/general/headerComp.vue'
import mobileMenu from './@core/components/general/mobileMenu.vue'
</script>

<template>
  <headerComp title="Aqua" />
  <RouterView />
  <mobileMenu class="fixed bottom-0" />
</template>
