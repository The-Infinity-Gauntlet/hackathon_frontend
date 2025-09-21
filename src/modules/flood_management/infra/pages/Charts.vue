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
            <div class="lg:flex lg:items-end lg:justify-between">
                <div>
                    <h1 class="grid gap-3 text-4xl font-semibold lg:text-5xl">Gráficos</h1>
                    <p class="my-2 flex items-center gap-3 text-xs text-[#999999] lg:text-lg">
                        <span class="material-symbols-outlined">update</span> {{ location.date }}
                    </p>
                </div>

                <div class="flex gap-5">
                    <button
                        class="w-40 cursor-pointer rounded-2xl bg-white py-2 font-semibold text-[#2768CA] shadow-md"
                    >
                        Dados atuais
                    </button>

                    <select
                        :name="field.autocomplete"
                        :id="field.id"
                        class="w-40 rounded-2xl bg-white py-2 text-center font-semibold text-black shadow-md outline-none"
                    >
                        <option value="">Previsão</option>
                        <option
                            v-for="(option, index) in field.options"
                            :key="option"
                            :value="field.id === 'year' ? option : index + 1"
                            class="bg-white font-semibold text-black"
                        >
                            {{ option }}
                        </option>
                    </select>
                </div>
            </div>

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
