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
    <h3 class="font-semibold">{{ item.data.datasets[0].label }}</h3>
    <Chart
        :type="item.type"
        :data="item.data"
        :options="chartOptions"
        class="mt-3 mb-10 grid rounded-2xl bg-[#FFFFFF] p-5 shadow-lg dark:bg-[#00182F]"
    />
</template>
