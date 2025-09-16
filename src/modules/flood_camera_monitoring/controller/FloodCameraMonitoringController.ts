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
  const predictionsError = ref<string | null>(null)

  const camerasRepo = container.resolve(FloodCameraMonitoringRepository)
  const predsRepo = container.resolve(FloodPredictionsRepository)

  const load = async () => {
    loading.value = true
    error.value = null
    predictionsError.value = null
    try {
      // Carrega câmeras primeiro (necessário para a tela funcionar)
      const camsPage = await camerasRepo.list()
      cameras.value = camsPage.results ?? []
    } catch (e: any) {
      error.value = e?.message ?? 'Erro ao carregar câmeras'
      loading.value = false
      return
    }

    // Tenta carregar predições, mas não bloqueia o uso das câmeras
    try {
      const predsPage = await predsRepo.list()
      const map: Record<string, PredictionData> = {}
      for (const item of predsPage.results ?? []) {
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
    } catch (e: any) {
      predictionsError.value = e?.message ?? 'Predições indisponíveis'
      // Mantém predictionsById vazio; interface continua funcionando
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
    predictionsError,
    load,
  }
})
// (Removido array estático duplicado de câmeras)
