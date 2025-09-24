<script setup lang="ts">
interface FloodPoint {
    neighborhood: string
    probability: number
    duration: string
}

defineProps<{
    points: FloodPoint[]
}>()
</script>

<template>
    <div class="flex">
        <div class="w-1/2 pr-4">
            <h3>Pontos atuais</h3>

            <table class="w-full table-fixed border-collapse overflow-hidden rounded-t-2xl">
                <thead>
                    <tr class="text-center text-sm font-semibold text-[#999999]">
                        <th class="py-2">Bairro</th>
                        <th class="py-2">Probabilidade</th>
                        <th class="py-2">Duração</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="point in points" :key="point.id" class="text-center text-xs font-semibold">
                        <td class="py-2">{{ point.neighborhood }}</td>
                        <td class="py-2">{{ point.probability }}%</td>
                        <td class="py-2">
                            <div class="flex items-center justify-center gap-2">
                                {{ point.duration }}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="w-1/2 pl-4">
            <h3>Altas probabilidades</h3>
        </div>
    </div>
</template>