<script setup lang="ts">
import { ref } from 'vue'
import SupportPopup from './supportPopup.vue'

const props = defineProps({
  ticket: {
    type: Object,
    required: true,
  },
})

const showPopup = ref(false)
const togglePopup = () => (showPopup.value = !showPopup.value)
</script>

<template>
  <div class="mb-3 flex items-center justify-between rounded-2xl p-5 shadow-xl">
    <div class="grid gap-1 text-xs font-semibold">
      <p>
        Código de suporte: <span class="font-normal text-[#999999]">{{ ticket.code }}</span>
      </p>
      <p>
        Suporte solicitado em:
        <span class="font-normal text-[#999999]">{{ ticket.interactions.req.date }}</span>
      </p>
      <p>
        Categoria:
        <span class="font-normal text-[#999999]">{{ ticket.interactions.req.category }}</span>
      </p>
      <p>
        Status:
        <span
          class="rounded-md px-2 py-0.5 font-normal"
          :class="[
            ticket.interactions.req.status === 'Concluído'
              ? 'bg-green-200 text-[#0F9900] dark:bg-green-300'
              : 'bg-red-200 text-[#990000] dark:bg-red-300',
          ]"
          >{{ ticket.interactions.req.status }}</span
        >
      </p>
    </div>

    <button
      class="rounded-2xl border border-[#2768CA] p-2 text-sm text-[#2768CA] dark:bg-[#2768CA] dark:text-white"
      @click="togglePopup"
    >
      Ver detalhes
    </button>
    <SupportPopup
      v-if="showPopup"
      :showPopup="showPopup"
      @close="showPopup = false"
      :ticket="ticket"
    />
  </div>
</template>
