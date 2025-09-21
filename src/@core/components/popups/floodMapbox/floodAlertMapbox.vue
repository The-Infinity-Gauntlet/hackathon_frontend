<script setup lang="ts">
import { computed } from 'vue'

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
</script>

<template>
    <p
        v-if="alertInfo"
        class="grid rounded-lg p-1 text-center text-[9px] text-white"
        :class="alertInfo.bgClass"
    >
        <span class="text-xs font-semibold">{{ props.alert }}</span>
        {{ alertInfo.description }}
    </p>
</template>
