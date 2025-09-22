<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useGeolocationStore } from '@/@core/plugins/registered/pinia/geolocation'
import { useFloodCameraMonitoringController } from '@/modules/flood_camera_monitoring/controller/FloodCameraMonitoringController'
import { BaseChart, ProfileForm } from '@/@core/components'
import { HlsStreamPlayer, EmbedStreamPlayer } from '@/modules/flood_camera_monitoring/infra/components'
import { Mapbox, SelectFloodAlert } from '../components'

type ViewMode = 'embed' | 'hls'

const geolocation = useGeolocationStore()
const ctrl = useFloodCameraMonitoringController()
const cams = computed(() => ctrl.camerasWithPrediction)

const menu = {
    id: 'menu',
    options: [
        {
            id: 0,
            label: 'Cadastre um novo ponto de alagamento',
            icon: 'add',
            link: '/admin/mapa-de-alagamento',
        },
        { id: 1, label: 'Gráficos', icon: 'bar_chart_4_bars', link: '/admin/graficos' },
        {
            id: 2,
            label: 'Cadastrar ocorrência',
            icon: 'report',
            link: '/admin/registrar-ocorrencia',
        },
        { id: 3, label: 'Histórico de cadastros', icon: 'schedule', link: '/admin/historico' },
        {
            id: 4,
            label: 'Emitir Notificação',
            icon: 'notifications_active',
            link: '/admin/registrar-notificacao',
        },
    ],
}
const data = {
    id: 'charts',
    options: [
        {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
            datasets: [
                {
                    label: 'Índices de alagamentos',
                    data: [12, 19, 3, 5, 2],
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                },
            ],
        }
    ],
}
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
const user = ref({
    picture: '/nicolefemello.jpeg',
    name: 'nicolefemello',
})
const historyNotifications = {
    id: 'notification',
    options: [
        { id: 0, alert: 'CRISE!', message: 'Probabilidade muito alta de alagamento.', icon: '/icons/notification/crise.svg', neighborhood: 'Centro' },
        { id: 1, alert: 'ALERTA!', message: 'Probabilidade alta de alagamento.', icon: '/icons/notification/alerta.svg', neighborhood: 'Floresta' },
        { id: 2, alert: 'MOBILIZAÇÃO!', message: 'Probabilidade baixa de alagamento.', icon: '/icons/notification/mobilizacao.svg', neighborhood: 'Boa Vista' },
        { id: 3, alert: 'NORMALIDADE!', message: 'Probabilidade muito baixa de alagamento.', icon: '/icons/notification/normalidade.svg', neighborhood: 'Glória' },
    ]
}

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
    <div class="container-admin">
        <nav class="bg-[#0453AF] rounded-xl text-white w-20 h-full mr-10">
            <ul class="grid justify-center gap-7 px-5 py-10">
                <li v-for="item in menu.options" :key="item.id">
                    <RouterLink :to="item.link">
                        <span class="material-symbols-outlined">{{ item.icon }}</span>
                    </RouterLink>
                </li>
            </ul>
        </nav>

        <div>
            <h1 class="font-semibold text-5xl">Área de Administração</h1>
            <p class="text-[#0453AF] font-semibold text-xl mt-3">Bem-vindo, {{ user.name }}!</p>

            <div class="grid grid-cols-2 items-center">
                <div class="w-[30vw] h-[14vw] bg-[#F3F3F3] dark:bg-[#00182F] rounded-2xl">
                    <!-- <Mapbox /> -->
                </div>

                <div class="w-[25vw] h-[18vw] mx-15">
                    <h3 class="text-[#999999] font-semibold mb-3">Altas probabilidades</h3>

                    <div class="grid grid-cols-2 bg-[#F3F3F3] dark:bg-[#00182F] overflow-hidden rounded-2xl">
                        <div v-for="(cam, index) in orderedCams.slice(0, 4)" :key="cam.id"
                            class="relative h-[7vw] border border-white dark:border-[#000D19]">
                            <!-- <EmbedStreamPlayer v-if="modes[cam.id] === 'embed' && cam.embed_url" :src="cam.embed_url"
                                :title="cam.name" class="h-full w-full" />
                            <HlsStreamPlayer v-else :src="cam.hls_url" :muted="true" :controls="true"
                                :lock-to-live="true" :live-delay="18" class="h-full w-full" /> -->
                            <span class="absolute z-10 bottom-1 text-2xl font-extrabold" :class="displayFloodPercent(cam) <= 40
                                ? 'text-[#27CA2C] '
                                : displayFloodPercent(cam) <= 70
                                    ? 'text-[#F87400]'
                                    : 'text-[#FF0A0A]', index % 2 == 0 ? 'right-3' : 'left-3'
                                ">{{ displayFloodPercent(cam) }}%</span>
                        </div>
                    </div>
                </div>

                <div class="w-[30vw] h-[14vw] bg-[#F3F3F3] dark:bg-[#00182F] rounded-2xl p-5">
                    <h3 class="text-[#999999] font-semibold mb-3">Pontos atuais</h3>
                </div>

                <div class="w-[25vw] h-[14vw] bg-[#F3F3F3] dark:bg-[#00182F] rounded-2xl p-5 mx-15">
                    <BaseChart :item="data.options[0]" />
                </div>
            </div>
        </div>

        <div class="ml-10">
            <input type="text" placeholder="Localize rapidamente a sua cidade/bairro..."
                class="w-full p-3 rounded-lg bg-[#F3F3F3] dark:bg-[#00182F] text-[#999999] outline-none">

            <div class="border border-[#2768CA] rounded-2xl p-5 my-5">
                <h3 class="text-[#999999] font-semibold mb-3">Notificações frequentes</h3>

                <ProfileForm />
            </div>

            <SelectFloodAlert v-model:alert="location.data[1].message" />
        </div>
    </div>
</template>

<style scoped>
.container-admin {
    display: flex;
    justify-content: space-between;
    height: 140vh;
}
</style>