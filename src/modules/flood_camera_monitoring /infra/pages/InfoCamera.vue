<script setup lang="ts">
import { reactive } from 'vue'
import cameras from '../../controller/FloodCameraMonitoringController'
import { HlsStreamPlayer, EmbedStreamPlayer } from '../components'

const props = defineProps<{ id: string }>()
const camera = cameras.find((c) => c.id === props.id)

type ViewMode = 'embed' | 'hls'
const modes = reactive<Record<string, ViewMode>>(
  Object.fromEntries(
    cameras.map((c) => [c.url, c.embed_url ? ('embed' as ViewMode) : ('hls' as ViewMode)]),
  ),
)
</script>

<template>
  <div v-if="camera" class="px-10 pb-20">
    <h1 class="mb-10 text-center text-2xl font-semibold">{{ camera.name }}</h1>

    <div class="mx-auto h-[35vw] w-[70%] overflow-hidden rounded-2xl bg-transparent">
      <EmbedStreamPlayer
        v-if="modes[camera.url] === 'embed' && camera.embed_url"
        :src="camera.embed_url"
        :title="camera.name"
        class="h-full w-full"
      />
      <HlsStreamPlayer
        v-else
        :src="camera.url"
        :muted="true"
        :controls="true"
        :lock-to-live="true"
        :live-delay="18"
        class="h-full w-full"
      />
    </div>

    <div class="flex gap-1">
      <button
        type="button"
        class="rounded-md px-2 py-1 text-xs font-semibold ring-1 ring-slate-300 dark:ring-slate-600"
        :class="
          modes[camera.url] === 'embed'
            ? 'bg-emerald-600 text-white ring-emerald-600'
            : 'bg-transparent text-slate-600 dark:text-slate-300'
        "
        :disabled="!camera.embed_url"
        @click="modes[camera.url] = 'embed'"
        title="Realtime (Embed)"
      >
        Realtime
      </button>
      <button
        type="button"
        class="rounded-md px-2 py-1 text-xs font-semibold ring-1 ring-slate-300 dark:ring-slate-600"
        :class="
          modes[camera.url] === 'hls'
            ? 'bg-blue-600 text-white ring-blue-600'
            : 'bg-transparent text-slate-600 dark:text-slate-300'
        "
        @click="modes[camera.url] = 'hls'"
        title="HLS"
      >
        HLS
      </button>
    </div>

    <p>Status: {{ camera.status }}</p>
    <p>Porcentagem de alagamento: {{ camera.flood_percentage }}%</p>
  </div>
  <div v-else>
    <p>Câmera não encontrada</p>
  </div>
</template>
