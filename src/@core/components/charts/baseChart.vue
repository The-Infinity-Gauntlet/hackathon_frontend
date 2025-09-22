<script setup lang="ts">
import Chart from 'primevue/chart'

const props = defineProps<{
    item: Object
}>()

const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            labels: {
                color: '#495057',
            },
        },
    },
    scales: {
        x: {
            ticks: {
                color: '#495057',
            },
            grid: {
                color: '#ebedef',
            },
        },
        y: {
            ticks: {
                color: '#495057',
            },
            grid: {
                color: '#ebedef',
            },
        },
    },
}
</script>

<template>
    <div class="grid rounded-2xl">
        <h3 class="mb-3 font-semibold text-[#999999]">{{ item.datasets[0].label }}</h3>
        <Chart type="bar" :data="item" :options="chartOptions" class="h-[10vw]" />
    </div>
</template>
