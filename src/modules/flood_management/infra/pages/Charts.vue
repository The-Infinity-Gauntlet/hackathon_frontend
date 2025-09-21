<script setup lang="ts">
import { ref } from 'vue'
import { ChartItems } from '@/@core/components'

const location = ref({
    neighborhood: null as string | null,
    city: null as string | null,
    data: [
        { name: 'Temperatura', icon: '/weather_information/cloud.svg', scale: 23 },
        {
            name: 'Probabilidade de enchente',
            icon: '/weather_information/danger.svg',
            scale: 59,
            message: 'NORMALIDADE!',
        },
        { name: 'Vazão do rio', icon: '/weather_information/river_discharge.svg', scale: 46 },
    ] as const,
    date: 'Seg, 22:00',
})
const data = {
    id: 'charts',
    options: [
        {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
            datasets: [
                {
                    label: 'Precipitação',
                    data: [12, 19, 3, 5, 2],
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                },
            ],
        },
        {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
            datasets: [
                {
                    label: 'Vazão do rio',
                    data: [12, 19, 3, 5, 2],
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                },
            ],
        },
        {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
            datasets: [
                {
                    label: 'Umidade do ar',
                    data: [12, 19, 3, 5, 2],
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                },
            ],
        },
        {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
            datasets: [
                {
                    label: 'Pressão atmosférica',
                    data: [12, 19, 3, 5, 2],
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                },
            ],
        },
    ],
}
const field = {
    id: 'forecast',
    options: ['1 hora', '3 horas', '6 horas', '12 horas', '1 dia', '2 dias', '3 dias', '7 dias'],
}
</script>

<template>
    <div>
        <section class="py-5">
            <h1 class="grid gap-3 text-4xl font-semibold lg:text-5xl">Gráficos</h1>
        </section>

        <section>
            <h2 class="text-2xl font-semibold lg:text-3xl">Dados atuais</h2>
            <p class="my-2 flex items-center gap-3 text-xs text-[#999999] lg:text-lg">
                <span class="material-symbols-outlined">update</span> {{ location.date }}
            </p>

            <div class="mt-5">
                <ChartItems
                    v-for="item in data.options"
                    :key="item"
                    :item="item"
                    class="lg:hidden"
                />
                <div
                    class="hidden space-x-5 overflow-x-auto pr-5 lg:grid lg:grid-cols-2 lg:justify-center"
                >
                    <ChartItems v-for="item in data.options" :key="item.id" :item="item" />
                </div>
            </div>
        </section>

        <section>
            <h2 class="mb-2 text-2xl font-semibold">Previsão</h2>
            <select
                :name="field.autocomplete"
                :id="field.id"
                class="mb-5 w-[35%] rounded-lg bg-[#2768CA] p-2 text-xs font-semibold text-white outline-none lg:w-[13%] lg:text-lg"
            >
                <option
                    v-for="(option, index) in field.options"
                    :key="option"
                    :value="field.id === 'year' ? option : index + 1"
                    class="bg-white font-semibold text-black dark:bg-[#00182F] dark:text-white"
                >
                    {{ option }}
                </option>
            </select>

            <div class="mt-5">
                <ChartItems
                    v-for="item in data.options"
                    :key="item"
                    :item="item"
                    class="lg:hidden"
                />
                <div
                    class="hidden space-x-5 overflow-x-auto pr-5 lg:grid lg:grid-cols-2 lg:justify-center"
                >
                    <ChartItems v-for="item in data.options" :key="item.id" :item="item" />
                </div>
            </div>
        </section>
    </div>
</template>
