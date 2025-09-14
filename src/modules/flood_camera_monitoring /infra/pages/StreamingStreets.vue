<script setup lang="ts">
import { reactive, onMounted, computed } from 'vue'
import type { CameraWithPrediction } from '../../interfaces/predictions'
import { useFloodCameraMonitoringController } from '../../controller/FloodCameraMonitoringController'
import { RefreshPredictionsButton } from '../components'

type ViewMode = 'embed' | 'hls'

const ctrl = useFloodCameraMonitoringController()
const cams = computed(() => ctrl.camerasWithPrediction)

const modes = reactive<Record<string, ViewMode>>({})

onMounted(async () => {
  await ctrl.load()
  cams.value.forEach((c: any) => {
    modes[c.id] = c.embed_url ? 'embed' : 'hls'
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
</script>

<template>
  <div class="grid justify-center px-5">
    <RefreshPredictionsButton />
    <h1 class="text-center text-2xl font-semibold">Visão geral das câmeras</h1>
    <div v-if="ctrl.loading" class="mt-10 text-center text-sm opacity-70">Carregando câmeras…</div>
    <div v-else-if="ctrl.error" class="mt-10 text-center text-sm text-red-600">
      {{ ctrl.error }}
    </div>
    <div v-else class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      <div
        v-for="cam in cams"
        :key="cam.id"
        class="overflow-hidden rounded-xl bg-white p-5 shadow-sm dark:bg-[#000d19]"
      >
        <!-- <div class="h-[13vw] overflow-hidden rounded-2xl bg-transparent">
          <EmbedStreamPlayer v-if="modes[cam.url] === 'embed' && cam.embed_url" :src="cam.embed_url"
            :title="cam.name" />
          <HlsStreamPlayer v-else :src="cam.url" :muted="true" :controls="true" :lock-to-live="true" :live-delay="18"
            class="h-full w-full" />
        </div> -->

        <div id="body" class="grid h-auto gap-2 px-4">
          <div class="flex items-start justify-between gap-5 py-3 text-sm">
            <p>{{ cam.name }}</p>
            <div class="flex shrink-0 gap-1">
              <button
                type="button"
                class="rounded-md px-2 py-1 text-xs font-semibold ring-1 ring-slate-300 dark:ring-slate-600"
                :class="
                  modes[cam.id] === 'embed'
                    ? 'bg-emerald-600 text-white ring-emerald-600'
                    : 'bg-transparent text-slate-600 dark:text-slate-300'
                "
                :disabled="!cam.embed_url"
                @click="modes[cam.id] = 'embed'"
                title="Realtime (Embed)"
              >
                Realtime
              </button>
              <button
                type="button"
                class="rounded-md px-2 py-1 text-xs font-semibold ring-1 ring-slate-300 dark:ring-slate-600"
                :class="
                  modes[cam.id] === 'hls'
                    ? 'bg-blue-600 text-white ring-blue-600'
                    : 'bg-transparent text-slate-600 dark:text-slate-300'
                "
                @click="modes[cam.id] = 'hls'"
                title="HLS"
              >
                HLS
              </button>
            </div>
          </div>

          <div class="flex items-center justify-center gap-1.5">
            <p class="grid text-right text-xs">Porcentagem de <span>alagamento</span></p>
            <p
              class="text-2xl font-semibold"
              :class="cam.prediction?.is_flooded ? 'text-[#CA2727]' : 'text-[#27CA2C]'"
            >
              {{ displayFloodPercent(cam) }}%
            </p>
          </div>

          <p class="text-sm">
            Status:
            <span :class="cam.status === 'Online' ? 'text-[#27CA2C]' : 'text-[#CA2727]'">
              {{ cam.status }}
            </span>
          </p>

          <RouterLink
            :to="{ path: `/cameras/${cam.id}` }"
            class="mx-auto mt-1 rounded-xl bg-[#0453AF] px-10 py-2 font-semibold text-white shadow-xl"
          >
            Ver mais
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
