<script setup lang="ts">
import FloodAlertMapbox from './floodMapbox/floodAlertMapbox.vue'
import WeatherStatsMapbox from './floodMapbox/weatherStatsMapbox.vue'

const props = defineProps<{
    neighborhood: string
    city: string
}>()

const location = {
    neighborhood: props.neighborhood,
    city: props.city,
    data: [
        {
            name: 'Probabilidade de enchente',
            icon: '/weather_information/danger.svg',
            scale: 59,
            message: 'CRISE!',
        },
    ] as const,
}
</script>

<template>
    <div
        class="absolute right-4 bottom-2 z-3 w-[96%] rounded-2xl bg-white p-4 shadow-lg lg:grid lg:w-[18vw] lg:justify-center lg:text-center dark:bg-[#000d19]"
    >
        <div>
            <h4>{{ location.neighborhood }}</h4>
            <p class="text-xs text-[#999999]">{{ location.city }}, Brasil</p>
        </div>

        <div class="my-2 flex items-center justify-between lg:grid lg:justify-center lg:gap-4">
            <FloodAlertMapbox :alert="location.data[0].message" class="w-[50%] lg:w-[15vw]" />
            <WeatherStatsMapbox :weatherStats="location.data" class="mx-auto" />
        </div>

        <div class="flex justify-between lg:grid lg:justify-center lg:gap-2">
            <button
                class="mx-auto cursor-pointer border-[#0453AF] text-xs lg:w-[15vw] lg:rounded-xl lg:border lg:py-2"
            >
                Mudar local
            </button>
            <hr class="h-5 border border-[#999999] lg:hidden" />
            <button
                class="mx-auto cursor-pointer border-[#0453AF] text-xs lg:w-[15vw] lg:rounded-xl lg:border lg:py-2"
            >
                Detalhes
            </button>
        </div>
    </div>
</template>
