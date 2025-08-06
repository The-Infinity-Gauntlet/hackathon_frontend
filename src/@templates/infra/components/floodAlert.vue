<script setup lang="ts">
import { computed } from 'vue'
const ALERTS = {
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
</script>

<template>
  <div class="my-5 grid gap-3">
    <p
      v-if="alertInfo"
      class="grid text-sm text-center p-1 rounded-lg text-black"
      :class="alertInfo.bgClass"
    >
      <span class="text-md font-semibold">{{ props.alert }}</span>
      {{ alertInfo.description }}
    </p>
  </div>
</template>
