<script setup lang="ts">
import { useInAppMessagingStore } from '../plugins/registered/pinia/inAppMessaging'

const store = useInAppMessagingStore()
</script>

<template>
  <div class="fixed -top-0 -left-5 -right-5 grid z-50 px-4">
    <div v-for="msg in store.messages" :key="msg.id"
      class="flex items-start gap-3 p-4 w-full bg-gray-900/90 text-white rounded-b-xl shadow-lg backdrop-blur-md border border-gray-700 animate-slide-in">

      <div class="w-6 h-6 flex items-center justify-center bg-blue-500 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z" />
        </svg>
      </div>

      <p class="text-sm font-medium">{{ msg.text }}</p>
    </div>
  </div>
</template>

<style scoped>
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-100%);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in {
  animation: slideIn 0.4s ease-out;
}
</style>