import { defineStore } from 'pinia'
import { container } from 'tsyringe'
import { ref, computed } from 'vue'
import type { ICamera } from '../interfaces/camera'
import type { PredictionData } from '../interfaces/predictions'
import { FloodCameraMonitoringRepository } from '../repositories/FloodCameraMonitoringRepository'
import { FloodPredictionsRepository } from '../repositories/FloodPredictionsRepository'

// Store mínima e direta: carrega câmeras (array) e predições (mapeadas por camera.id)
export const useFloodCameraMonitoringController = defineStore('flood_monitoring', () => {
  const cameras = ref<ICamera[]>([])
  const predictionsById = ref<Record<string, PredictionData>>({})
  const loading = ref(false)
  const error = ref<string | null>(null)

  const camerasRepo = container.resolve(FloodCameraMonitoringRepository)
  const predsRepo = container.resolve(FloodPredictionsRepository)

  const load = async () => {
    loading.value = true
    error.value = null
    try {
      const [camsPage, predsPage] = await Promise.all([camerasRepo.list(), predsRepo.list()])

      // câmeras já vêm no formato ICamera[] (porque o repo as mapeia)
      cameras.value = camsPage.results ?? []

      // predictions: backend envia results com { camera, is_flooded/confidence/probabilities|prediction }
      const map: Record<string, PredictionData> = {}
      for (const item of predsPage.results ?? []) {
        const camId = item?.camera?.id
        if (!camId) continue
        // aceitar tanto shape achatado quanto nested
        const pred = (item as any).prediction ?? {
          is_flooded: (item as any).is_flooded ?? false,
          confidence: (item as any).confidence ?? 0,
          probabilities: (item as any).probabilities ?? { normal: 0, flooded: 0 },
        }
        map[camId] = pred
      }
      predictionsById.value = map
    } catch (e: any) {
      error.value = e?.message ?? 'Erro ao carregar câmeras/predições'
    } finally {
      loading.value = false
    }
  }

  // helper: retorna cada câmera com a predição acoplada (não persiste, só computa)
  const camerasWithPrediction = computed(() =>
    cameras.value.map((c) => ({
      ...c,
      prediction: predictionsById.value[c.id],
    })),
  )

  return {
    cameras,
    predictionsById,
    loading,
    error,
    camerasWithPrediction,
    load,
  }
})
