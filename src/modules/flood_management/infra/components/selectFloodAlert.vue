<script setup lang="ts">
import { ref, computed } from 'vue'

type AlertKey = 'CRISE!' | 'ALERTA!' | 'ATENÇÃO!' | 'MOBILIZAÇÃO!' | 'NORMALIDADE!'
interface AlertInfo {
  bgClass: string
  description: string
}

const ALERTS: Record<AlertKey, AlertInfo> = {
  'CRISE!': {
    bgClass: 'bg-[#6326CC]',
    description: 'Probabilidade muito alta de alagamento.',
  },
  'ALERTA!': {
    bgClass: 'bg-[#FF0A0A]',
    description: 'Probabilidade alta de alagamento.',
  },
  'ATENÇÃO!': {
    bgClass: 'bg-[#F87400]',
    description: 'Probabilidade moderada de alagamento.',
  },
  'MOBILIZAÇÃO!': {
    bgClass: 'bg-[#FFE101]',
    description: 'Probabilidade baixa de alagamento.',
  },
  'NORMALIDADE!': {
    bgClass: 'bg-[#00D42E]',
    description: 'Probabilidade muito baixa de alagamento.',
  },
} as const

const props = defineProps<{
  alert: keyof typeof ALERTS
}>()

const alertInfo = computed(() => ALERTS[props.alert])

const alerts = {
  'CRISE!': {
    bgClass: 'bg-[#6326CC]',
    description: 'Probabilidade muito alta de alagamento.',
  },
  'ALERTA!': {
    bgClass: 'bg-[#FF0A0A]',
    description: 'Probabilidade alta de alagamento.',
  },
  'ATENÇÃO!': {
    bgClass: 'bg-[#F87400]',
    description: 'Probabilidade moderada de alagamento.',
  },
  'MOBILIZAÇÃO!': {
    bgClass: 'bg-[#FFE101]',
    description: 'Probabilidade baixa de alagamento.',
  },
  'NORMALIDADE!': {
    bgClass: 'bg-[#00D42E]',
    description: 'Probabilidade muito baixa de alagamento.',
  },
}

const showPopup = ref(false)
const togglePopup = () => (showPopup.value = !showPopup.value)
</script>

<template>
  <div class="my-5 grid gap-3">
    <div
      v-if="alertInfo"
      @click="togglePopup"
      class="relative grid rounded-lg p-1 text-center text-sm text-black"
      :class="alertInfo.bgClass"
    >
      <span class="text-md font-semibold">{{ props.alert }}</span>
      {{ alertInfo.description }}
      <span class="material-symbols-outlined absolute top-4 right-1">keyboard_arrow_down</span>
    </div>
  </div>
</template>
