import { defineStore } from 'pinia'
import { container } from 'tsyringe'
import { ref, computed } from 'vue'
import type { ICamera } from '../interfaces/camera'
import type { PredictionData } from '../interfaces/predictions'
import { FloodCameraMonitoringRepository } from '../repositories/FloodCameraMonitoringRepository'
import { FloodPredictionsRepository } from '../repositories/FloodPredictionsRepository'
import { FloodDemoRepository } from '../repositories/FloodDemoRepository'

// Store mínima e direta: carrega câmeras (array) e predições (mapeadas por camera.id)

export const useFloodCameraMonitoringController = defineStore('flood_monitoring', () => {
  const cameras = ref<ICamera[]>([])
  const predictionsById = ref<Record<string, PredictionData>>({})
  const loading = ref(false)
  const error = ref<string | null>(null)
  const predictionsError = ref<string | null>(null)

  const camerasRepo = container.resolve(FloodCameraMonitoringRepository)
  const predsRepo = container.resolve(FloodPredictionsRepository)
  const demoRepo = container.resolve(FloodDemoRepository)

  let inFlight: Promise<void> | null = null

  const load = async (): Promise<void> => {
    if (inFlight) return inFlight
    inFlight = (async () => {
      loading.value = true
      error.value = null
      predictionsError.value = null

      const [camsRes, predsRes, demoRes] = await Promise.allSettled([
        camerasRepo.list(),
        predsRepo.list(),
        Promise.all([demoRepo.get(), demoRepo.predictDemo()]),
      ])

      if (camsRes.status === 'fulfilled') {
        cameras.value = camsRes.value.results ?? []
      } else {
        error.value = camsRes.reason?.message ?? 'Erro ao carregar câmeras'
        loading.value = false
        return
      }

      // Add demo camera if available
      if (demoRes.status === 'fulfilled') {
        const [demoHlsUrl, demoPred] = demoRes.value
        if (demoHlsUrl) {
          const demoCamera: ICamera = {
            id: 'demo',
            name: 'Câmera Demo',
            hls_url: demoHlsUrl,
            embed_url: undefined,
            status: 'Online',
            flood_percentage: 0,
            link: '',
          }
          cameras.value.push(demoCamera)

          // Add demo prediction
          if (demoPred) {
            const demoPrediction: PredictionData = {
              is_flooded: demoPred.is_flooded ?? false,
              confidence: demoPred.confidence ?? 0,
              probabilities: {
                normal: demoPred.probabilities?.normal ?? 1 - (demoPred.confidence ?? 0) / 100,
                flooded: demoPred.probabilities?.flooded ?? (demoPred.confidence ?? 0) / 100,
              },
            }
            predictionsById.value['demo'] = demoPrediction
          }
        }
      }

      if (predsRes.status === 'fulfilled') {
        const map: Record<string, PredictionData> = { ...predictionsById.value }
        for (const item of predsRes.value.results ?? []) {
          const camId = item?.camera?.id
          if (!camId) continue
          const pred = (item as any).prediction ?? {
            is_flooded: (item as any).is_flooded ?? false,
            confidence: (item as any).confidence ?? 0,
            probabilities: (item as any).probabilities ?? { normal: 0, flooded: 0 },
          }
          map[camId] = pred
        }
        predictionsById.value = map
      } else {
        predictionsError.value = predsRes.reason?.message ?? 'Predições indisponíveis'
      }

      loading.value = false
    })()
    try {
      await inFlight
    } finally {
      inFlight = null
    }
  }

  // helper: retorna cada câmera com a predição acoplada (não persiste, só computa)
  const camerasWithPrediction = computed(() =>
    cameras.value.map((c) => {
      const prediction = predictionsById.value[c.id]
      return {
        ...c,
        prediction,
        // For demo camera, calculate flood percentage from prediction (already in 0..100)
        flood_percentage:
          c.id === 'demo' && prediction
            ? Number(Math.min(100, Math.max(0, prediction.probabilities.flooded)).toFixed(2))
            : c.flood_percentage,
      }
    }),
  )

  return {
    cameras,
    predictionsById,
    loading,
    error,
    camerasWithPrediction,
    predictionsError,
    load,
  }
})
