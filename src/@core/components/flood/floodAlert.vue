<script setup lang="ts">
import { computed } from 'vue'

type AlertKey = 'CRISE!' | 'ALERTA!' | 'ATENÇÃO!' | 'MOBILIZAÇÃO!' | 'NORMALIDADE!'
interface AlertInfo {
  bgClass: string
  description: string
}

const ALERTS: Record<AlertKey, AlertInfo> = {
  'CRISE!': {
    bgClass: 'bg-[#6326CC] text-white',
    description: 'Probabilidade muito alta de alagamento.',
  },
  'ALERTA!': {
    bgClass: 'bg-[#FF0A0A] text-white',
    description: 'Probabilidade alta de alagamento.',
  },
  'ATENÇÃO!': {
    bgClass: 'bg-[#F87400] text-black',
    description: 'Probabilidade moderada de alagamento.',
  },
  'MOBILIZAÇÃO!': {
    bgClass: 'bg-[#FFE101] text-black',
    description: 'Probabilidade baixa de alagamento.',
  },
  'NORMALIDADE!': {
    bgClass: 'bg-[#00D42E] text-black',
    description: 'Probabilidade muito baixa de alagamento.',
  },
} as const

const props = defineProps<{
  alert: keyof typeof ALERTS
}>()

const alertInfo = computed(() => ALERTS[props.alert])
</script>

<template>
  <div class="my-5 grid gap-3">
    <p v-if="alertInfo" class="grid rounded-lg p-1 text-center text-sm" :class="alertInfo.bgClass">
      <span class="text-md font-semibold">{{ props.alert }}</span>
      {{ alertInfo.description }}
    </p>
  </div>
</template>
