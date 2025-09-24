<script setup lang="ts">
import { computed, reactive, ref, onMounted } from 'vue'
import { useFloodCameraMonitoringController } from '@/modules/flood_camera_monitoring/controller/FloodCameraMonitoringController'
import { CameraItems } from '@/@core/components'

interface FloodPoint {
    neighborhood: string
    probability: number
    duration: string
}

defineProps<{
    points: FloodPoint[]
}>()

type ViewMode = 'embed' | 'hls'
const ctrl = useFloodCameraMonitoringController()
const cams = computed(() => ctrl.camerasWithPrediction)

const modes = reactive<Record<string, ViewMode>>({})
const orderedCams = computed(() => {
    return [...cams.value].sort((a, b) => {
        const aOnline = a.status === 'Online'
        const bOnline = b.status === 'Online'
        if (aOnline !== bOnline) return aOnline ? -1 : 1
        const aPct = displayFloodPercent(a as any)
        const bPct = displayFloodPercent(b as any)
        if (aPct !== bPct) return bPct - aPct
        return String(a.name || '').localeCompare(String(b.name || ''))
    })
})
function displayFloodPercent(cam: CameraWithPrediction): number {
    if (cam.prediction && typeof cam.prediction.probabilities?.flooded === 'number') {
        const v = cam.prediction.probabilities.flooded
        const clamped = Math.min(100, Math.max(0, v))
        return Number(clamped.toFixed(2))
    }
    return cam.flood_percentage
}

const currentIndex = ref(0)
const next = () => {
    if (currentIndex.value < orderedCams.value.slice(0, 4).length - 1) {
        currentIndex.value++
    } else {
        currentIndex.value = 0
    }
}
const prev = () => {
    if (currentIndex.value > 0) {
        currentIndex.value--
    } else {
        currentIndex.value = 3
    }
}

const riskLabel = (prob: number) => {
    if (prob > 0.7) return 'Alta probabilidade de risco'
    if (prob > 0.4) return 'Média probabilidade de risco'
    return 'Baixa probabilidade de risco'
}
const riskClass = (prob: number) => {
    if (prob > 0.7) return 'text-red-600 font-bold text-lg'
    if (prob > 0.4) return 'text-yellow-500 font-bold text-lg'
    return 'text-green-600 font-bold text-lg'
}

onMounted(async () => {
    await ctrl.load()
    const currentLocation = await geolocation.findNeighborhood()
    location.value.neighborhood = currentLocation.neighborhood
    location.value.city = currentLocation.city
    cams.value.forEach((c: any) => {
        modes[c.id] = 'hls'
    })
})
</script>

<template>
    <div class="mt-10 flex justify-between">
        <div class="flex w-1/2 flex-col items-center pr-4">
            <h3 class="mb-4 text-xl font-bold">Pontos atuais</h3>

            <table class="w-full table-fixed border-collapse overflow-hidden rounded-t-2xl">
                <thead>
                    <tr class="text-center text-sm font-semibold text-[#999999]">
                        <th class="py-2">Bairro</th>
                        <th class="py-2">Probabilidade</th>
                        <th class="py-2">Duração</th>
                    </tr>
                </thead>

                <tbody>
                    <tr
                        v-for="point in points"
                        :key="point.id"
                        class="text-center text-xs font-semibold"
                    >
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

        <div class="flex w-1/2 flex-col items-center pl-4">
            <h3 class="mb-4 text-xl font-bold">Altas probabilidades</h3>

            <div class="relative h-[15vw] w-[80%] overflow-hidden rounded-2xl bg-gray-200">
                <span
                    @click="prev"
                    class="material-symbols-outlined absolute top-1/2 left-2 z-10 -translate-y-1/2 cursor-pointer text-white"
                >
                    chevron_left
                </span>

                <div
                    class="flex h-full transition-transform duration-500"
                    :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
                >
                    <div
                        v-for="(cam, index) in orderedCams"
                        :key="cam.id"
                        class="flex min-w-full flex-col items-center justify-center"
                    >
                        <div class="flex w-full justify-center">
                            <CameraItems :item="cam" />
                        </div>

                        <div class="mt-4 text-center">
                            <p class="font-semibold">Situação:</p>
                            <p :class="riskClass(cam.probability)">
                                {{ riskLabel(cam.probability) }}
                            </p>
                        </div>
                    </div>
                </div>

                <span
                    @click="next"
                    class="material-symbols-outlined absolute top-1/2 right-2 z-10 -translate-y-1/2 cursor-pointer text-white"
                >
                    chevron_right
                </span>
            </div>
            <div class="relative w-[80%] overflow-hidden">
                <div
                    class="flex h-full transition-transform duration-500"
                    :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
                >
                    <div
                        v-for="(cam, index) in orderedCams"
                        :key="cam.id"
                        class="flex min-w-full flex-col items-center justify-center"
                    >
                        <div class="mt-4 text-center">
                            <p class="font-semibold">Situação:</p>
                            <p :class="riskClass(cam.probability)">
                                {{ riskLabel(cam.probability) }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
