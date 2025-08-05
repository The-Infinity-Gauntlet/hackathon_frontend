<script setup lang="ts">
import 'reflect-metadata'
import headerComp from '@/@core/components/general/headerComp.vue'
import Menu from './@core/components/general/menu.vue'
</script>

<template>
  <headerComp title="Aqua" />
  <RouterView />
  <Menu class="fixed bottom-0" />
</template>
