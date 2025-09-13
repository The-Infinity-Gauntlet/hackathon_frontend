<script setup lang="ts">
import { reactive, onMounted, onUnmounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useFloodCameraMonitoringController } from '../../controller/FloodCameraMonitoringController'
import { HlsStreamPlayer, EmbedStreamPlayer } from '../components'

// Props
const props = defineProps<{ id: string }>()

// Router
const router = useRouter()

// Store/controller
const ctrl = useFloodCameraMonitoringController()

// Computed list of cameras (with prediction)
const cameras = computed(() => ctrl.camerasWithPrediction)

// Current camera (nullable until load resolves)
const camera = computed(() => cameras.value.find((c) => c.id === props.id))

// Index helpers
const currentIndex = computed(() => cameras.value.findIndex((c) => c.id === props.id))
const canPrev = computed(() => currentIndex.value > 0)
const canNext = computed(
  () => currentIndex.value >= 0 && currentIndex.value < cameras.value.length - 1,
)

// View modes per camera id
type ViewMode = 'embed' | 'hls'
const modes = reactive<Record<string, ViewMode>>({})

// Initialize data
onMounted(async () => {
  // Load cameras & predictions if not yet loaded
  if (!ctrl.cameras.length) {
    await ctrl.load()
  }
  const c = ctrl.cameras.find((x) => x.id === props.id)
  if (c && !modes[c.id]) modes[c.id] = c.embed_url ? 'embed' : 'hls'
})

// When switching camera id (route change), ensure a mode is set
watch(camera, (c) => {
  if (c && !modes[c.id]) modes[c.id] = c.embed_url ? 'embed' : 'hls'
})

// Navigation actions
function goPrev() {
  if (!canPrev.value) return
  const target = cameras.value[currentIndex.value - 1]
  if (target) router.push({ name: 'camera-info', params: { id: target.id } })
}

function goNext() {
  if (!canNext.value) return
  const target = cameras.value[currentIndex.value + 1]
  if (target) router.push({ name: 'camera-info', params: { id: target.id } })
}

// Keyboard navigation (setas esquerda/direita)
function handleKey(e: KeyboardEvent) {
  if (e.key === 'ArrowRight') {
    goNext()
  } else if (e.key === 'ArrowLeft') {
    goPrev()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKey)
})
onUnmounted(() => {
  window.removeEventListener('keydown', handleKey)
})
</script>

<template>
  <div v-if="camera" class="px-10">
    <h1 class="mb-7 text-center text-2xl font-semibold">{{ camera.name }}</h1>

    <div class="relative mx-auto h-[37.5vw] w-[75vw] overflow-hidden rounded-2xl bg-transparent group">
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
      <!-- Botão próxima câmera dentro da área interna -->
      <button
        v-if="canNext"
        @click.stop="goNext"
        class="absolute right-3 top-3 rounded-md bg-blue-600/80 px-3 py-1 text-sm font-semibold text-white shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-white/60 opacity-0 group-hover:opacity-100 transition-opacity"
        title="Próxima câmera (→)"
      >
        Próxima ▶
      </button>
      <button
        v-if="canPrev"
        @click.stop="goPrev"
        class="absolute left-3 top-3 rounded-md bg-blue-600/80 px-3 py-1 text-sm font-semibold text-white shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-white/60 opacity-0 group-hover:opacity-100 transition-opacity"
        title="Câmera anterior (←)"
      >
        ◀ Anterior
      </button>
    </div>

    <div class="my-5 flex justify-end gap-5">
      <button
        type="button"
        class="rounded-md px-2 py-1 text-xs font-semibold ring-1 ring-slate-300 lg:text-sm dark:ring-slate-600"
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
        class="rounded-md px-2 py-1 text-xs font-semibold ring-1 ring-slate-300 lg:text-sm dark:ring-slate-600"
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

    <div class="mt-5 flex items-center justify-between">
      <p class="grid text-center text-2xl font-semibold">
        Câmera <span>{{ currentIndex + 1 }} de {{ cameras.length }}</span>
      </p>

      <div class="flex gap-5">
        <button
          @click="goPrev"
          :disabled="!canPrev"
          class="cursor-pointer rounded-lg bg-blue-500 px-10 py-2 font-semibold text-white shadow-xl disabled:bg-gray-400"
        >
          Anterior
        </button>

        <button class="rounded-lg bg-blue-500 px-10 py-2 font-semibold text-white shadow-xl">
          <RouterLink to="/cameras">Todas as câmeras</RouterLink>
        </button>

        <button
          @click="goNext"
          :disabled="!canNext"
          class="cursor-pointer rounded-lg bg-blue-500 px-10 py-2 font-semibold text-white shadow-xl disabled:bg-gray-400"
        >
          Próxima
        </button>
      </div>

      <p class="grid text-center font-semibold">
        Porcentagem de <span>alagamento:</span>
        <span
          class="text-4xl"
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
