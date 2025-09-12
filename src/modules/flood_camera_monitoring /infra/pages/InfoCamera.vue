<script setup lang="ts">
import { reactive, onMounted, computed } from 'vue'
import { useFloodCameraMonitoringController } from '../../controller/FloodCameraMonitoringController'
import { HlsStreamPlayer, EmbedStreamPlayer } from '../components'

const props = defineProps<{ id: string }>()
const ctrl = useFloodCameraMonitoringController()
const camera = computed(() => ctrl.camerasWithPrediction.find((c) => c.id === props.id))

type ViewMode = 'embed' | 'hls'
const modes = reactive<Record<string, ViewMode>>({})

onMounted(async () => {
  await ctrl.load()
  const c = ctrl.cameras.find((x) => x.id === props.id)
  if (c) modes[c.id] = c.embed_url ? 'embed' : 'hls'
})
</script>

<template>
  <div v-if="camera" class="px-10 pb-20">
    <h1 class="mb-10 text-center text-2xl font-semibold">{{ camera.name }}</h1>

    <div class="mx-auto h-[45vw] w-[80vw] overflow-hidden rounded-2xl bg-transparent">
      <EmbedStreamPlayer
        v-if="modes[camera.id] === 'embed' && camera.embed_url"
        :src="camera.embed_url"
        :title="camera.name"
        class="h-full w-full"
      />
      <HlsStreamPlayer
        v-else
        :src="camera.hls_url"
        :muted="true"
        :controls="true"
        :lock-to-live="true"
        :live-delay="18"
        class="h-full w-full"
      />
    </div>

    <div class="my-5 flex justify-end gap-1">
      <button
        type="button"
        class="rounded-md px-2 py-1 text-xs font-semibold ring-1 ring-slate-300 dark:ring-slate-600"
        :class="
          modes[camera.id] === 'embed'
            ? 'bg-emerald-600 text-white ring-emerald-600'
            : 'bg-transparent text-slate-600 dark:text-slate-300'
        "
        :disabled="!camera.embed_url"
        @click="modes[camera.id] = 'embed'"
        title="Realtime (Embed)"
      >
        Realtime
      </button>
      <button
        type="button"
        class="rounded-md px-2 py-1 text-xs font-semibold ring-1 ring-slate-300 dark:ring-slate-600"
        :class="
          modes[camera.id] === 'hls'
            ? 'bg-blue-600 text-white ring-blue-600'
            : 'bg-transparent text-slate-600 dark:text-slate-300'
        "
        @click="modes[camera.id] = 'hls'"
        title="HLS"
      >
        HLS
      </button>
    </div>

    <div class="grid">
      <p>
        Status:
        <span
          class="font-semibold"
          :class="camera.status == 'Online' ? 'text-[#27CA2C]' : 'text-[#FF0A0A]'"
          >{{ camera.status }}</span
        >
      </p>
      <p>
        Porcentagem de alagamento:
        <span
          class="font-semibold"
          :class="
            camera.flood_percentage <= 40
              ? 'text-[#27CA2C]'
              : camera.flood_percentage <= 70
                ? 'text-[#F87400]'
                : 'text-[#FF0A0A]'
          "
          >{{ camera.flood_percentage }}%</span
        >
      </p>
    </div>
  </div>

  <div v-else>
    <p>Câmera não encontrada</p>
  </div>
</template>
