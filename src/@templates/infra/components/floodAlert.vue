<script setup lang="ts">
import { computed } from 'vue'
const ALERTS = {
  'CRISE!': {
    bgClass: 'bg-[#6326CC] dark:bg-[#4B1D99]',
    description: 'Probabilidade muito alta de alagamento.',
  },
  'ALERTA!': {
    bgClass: 'bg-[#FF0A0A] dark:bg-[#CC0808]',
    description: 'Probabilidade alta de alagamento.',
  },
  'ATENÇÃO!': {
    bgClass: 'bg-[#F87400] dark:bg-[#C95C00]',
    description: 'Probabilidade moderada de alagamento.',
  },
  'MOBILIZAÇÃO!': {
    bgClass: 'bg-[#FFE101] dark:bg-[#CCB901]',
    description: 'Probabilidade baixa de alagamento.',
  },
  'NORMALIDADE!': {
    bgClass: 'bg-[#00D42E] dark:bg-[#00A122]',
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
    <p v-if="alertInfo" class="grid text-sm text-center p-1 rounded-lg" :class="alertInfo.bgClass">
      <span class="text-md font-semibold">{{ props.alert }}</span>
      {{ alertInfo.description }}
    </p>
  </div>
</template>
