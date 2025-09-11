<script setup lang="ts">
import { useInAppMessagingStore } from '@/@core/plugins/registered/pinia/inAppMessaging'

const store = useInAppMessagingStore()
</script>

<template>
  <div class="fixed -top-0 -right-5 -left-5 z-50 grid px-4">
    <div
      v-for="msg in store.messages"
      :key="msg.id"
      class="animate-slide-in flex w-full items-start gap-3 rounded-b-xl border border-gray-700 bg-gray-900/90 p-4 text-white shadow-lg backdrop-blur-md"
    >
      <div class="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z"
          />
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
