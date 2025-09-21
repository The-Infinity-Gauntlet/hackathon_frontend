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
    <div class="my-10 grid rounded-2xl bg-[#E5E5E5] p-5 shadow-lg dark:bg-[#00182F]">
        <h3 class="mb-2 font-semibold">{{ item.datasets[0].label }}</h3>
        <Chart type="bar" :data="item" :options="chartOptions" />
    </div>
</template>
