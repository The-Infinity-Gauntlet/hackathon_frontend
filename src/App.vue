<script setup lang="ts">
import 'reflect-metadata'

import { onMounted } from 'vue'
import { useInAppMessagingStore } from '@/@core/plugins/registered/pinia/inAppMessaging'
import InAppMessages from '@/@core/components/InAppMessages.vue'

const store = useInAppMessagingStore()

onMounted(() => {
  if (!sessionStorage.getItem('welcomeNotificationShown')) {
    const id = Date.now()

    store.messages.push({
      id,
      text: 'Bem-vindo(a) ao site! 🎉',
    })

    sessionStorage.setItem('welcomeNotificationShown', 'true')

    setTimeout(() => {
      store.messages = store.messages.filter((m) => m.id !== id)
    }, 5000)
  }
})
</script>

<template>
  <RouterView v-slot="{ Component }">
    <InAppMessages />
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
</template>
