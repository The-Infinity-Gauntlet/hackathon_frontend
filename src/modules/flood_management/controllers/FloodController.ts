import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { container } from 'tsyringe'
import type { Feature } from 'geojson'

import type {
  IFlood,
  IFloodControllerState,
  IFloodIAControllerState,
  IRegisterFloodPointPayload,
} from '../interfaces/flood'
import { FloodRepository, FloodIARepository } from '../repositories/FloodRepository'

export const useFloodController = defineStore('flood', () => {
  const floodRepository = container.resolve(FloodRepository)
  const OFFLINE_POSTS_KEY = 'offlineFloodPointQueue'

  function loadOfflineQueue(): any[] {
    try {
      const raw = localStorage.getItem(OFFLINE_POSTS_KEY)
      if (!raw) return []
      const parsed = JSON.parse(raw)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }

  function saveOfflineQueue(q: any[]) {
    try {
      localStorage.setItem(OFFLINE_POSTS_KEY, JSON.stringify(q))
    } catch {}
  }

  const state = reactive<IFloodControllerState>({
    floods: [],
    currentFlood: {},
    pagination: {
      page: 1,
      pageSize: 100,
      offset: 0,
      limit: 10,
    },
    polygon: null as Feature | null,
    loading: false,
    search: '',
  })

  const loadPolygon = () => {
    const saved = localStorage.getItem('floodPolygon')
    if (saved) state.polygon = JSON.parse(saved)
  }

  const floods = computed(() => state.floods)
  const currentFlood = computed(() => state.currentFlood)
  const loading = computed(() => state.loading)
  const polygon = computed({
    get: () => state.polygon,
    set: (value) => {
      state.polygon = value
    },
  })

  const pagination = computed({
    get: () => state.pagination,
    set: (value) => (state.pagination = value),
  })

  const search = computed({
    get: () => state.search,
    set: (value) => (state.search = value),
  })

  const setPolygon = (geojson: any) => {
    state.polygon = geojson
    try {
      localStorage.setItem('floodPolygon', JSON.stringify(geojson))
    } catch {}
  }

  const clearPolygon = () => {
    state.polygon = null
    try {
      localStorage.removeItem('floodPolygon')
    } catch {}
  }

  const getFloods = async () => {
    state.loading = true
    try {
      const result: any = await floodRepository.list()
      // Some APIs return an array, others a paginated object. Normalize here.
      const items = Array.isArray(result) ? result : result.results
      state.floods = items ?? []
      if (!Array.isArray(result)) {
        state.pagination = {
          ...state.pagination,
          page: result.page_number ?? state.pagination.page,
          pageSize: result.page_size ?? state.pagination.pageSize,
        }
      }
    } finally {
      state.loading = false
    }
  }

  const getFloodById = async (id: string) => {
    state.loading = true
    try {
      const result = await floodRepository.getById(id)
      state.currentFlood = result
      return result
    } finally {
      state.loading = false
    }
  }

  const clearCurrentFlood = () => {
    state.currentFlood = {}
  }

  const createFlood = async (flood: Partial<IFlood>) => {
    try {
      state.loading = true
      const data = await floodRepository.create(flood)
      await getFloods()
      return data
    } catch (error) {
      throw error
    } finally {
      state.loading = false
    }
  }

  const updateFlood = async (id: string, flood: Partial<IFlood>) => {
    try {
      state.loading = true
      const data = await floodRepository.update(id, flood)
      await getFloods()
      return data
    } catch (error) {
      throw error
    } finally {
      state.loading = false
    }
  }

  const deleteFlood = async (id: string) => {
    try {
      state.loading = true
      await floodRepository.delete(id)
      await getFloods()
    } catch (error) {
      throw error
    } finally {
      state.loading = false
    }
  }

  const registerFloodPoint = async (payload: IRegisterFloodPointPayload) => {
    try {
      state.loading = true
      // thin pass-through; server validates created_at <= finished_at
      const data = await floodRepository.registerPoint(payload)
      return data
    } catch (e: any) {
      // Only queue offline on network errors or clearly retriable conditions
      const status = e?.response?.status
      const code = e?.code
      const isNetworkError = !navigator.onLine || code === 'ERR_NETWORK' || status === 0
      if (isNetworkError) {
        const q = loadOfflineQueue()
        q.push({ payload, queued_at: new Date().toISOString() })
        saveOfflineQueue(q)
      }
      throw e
    } finally {
      state.loading = false
    }
  }

  const loadRegionsNeighborhoods = async (city?: string) => {
    try {
      state.loading = true
      const data = await floodRepository.regionsNeighborhoods(city)
      return data
    } finally {
      state.loading = false
    }
  }

  const syncOfflineQueue = async () => {
    const q = loadOfflineQueue()
    if (!q.length) return { synced: 0, remaining: 0 }
    let synced = 0
    const remaining: any[] = []
    for (const item of q) {
      try {
        await floodRepository.registerPoint(item.payload)
        synced += 1
      } catch {
        remaining.push(item)
      }
    }
    saveOfflineQueue(remaining)
    return { synced, remaining: remaining.length }
  }

  // Optional: hook to automatically sync when connection is restored
  const init = () => {
    try {
      loadPolygon()
    } catch {}
    if (typeof window !== 'undefined') {
      const handler = async () => {
        try {
          await syncOfflineQueue()
        } catch {}
      }
      window.addEventListener('online', handler)
    }
  }

  return {
    state,
    floods,
    currentFlood,
    pagination,
    loading,
    search,
    polygon,
    loadPolygon,
    setPolygon,
    clearPolygon,
    getFloods,
    getFloodById,
    clearCurrentFlood,
    createFlood,
    updateFlood,
    deleteFlood,
    registerFloodPoint,
    loadRegionsNeighborhoods,
    syncOfflineQueue,
    init,
  }
})

export const useFloodIAController = defineStore('floodIA', () => {
  const floodIARepository = container.resolve(FloodIARepository)

  const state = reactive<IFloodIAControllerState>({
    forecasts: [],
    currentForecast: {},
    pagination: {
      page: 1,
      pageSize: 100,
      offset: 0,
      limit: 10,
    },
    loading: false,
    search: '',
  })

  const forecasts = computed(() => state.forecasts)
  const currentForecast = computed(() => state.currentForecast)
  const loading = computed(() => state.loading)

  const pagination = computed({
    get: () => state.pagination,
    set: (value) => (state.pagination = value),
  })

  const search = computed({
    get: () => state.search,
    set: (value) => (state.search = value),
  })

  const getForecasts = async () => {
    state.loading = true
    const result = await floodIARepository.list()
    state.forecasts = result.results ?? result
    state.pagination = {
      ...state.pagination,
      page: result.page_number,
      pageSize: result.page_size,
      //total: result.total,
      //num_pages: result.num_pages,
    }
    state.loading = false
  }

  const getForecastById = async (id: string) => {
    state.loading = true
    const result = await floodIARepository.getById(id)
    state.currentForecast = result
    state.loading = false
  }

  const clearForecast = async () => {
    state.currentForecast = {}
  }

  return {
    state,
    forecasts,
    currentForecast,
    loading,
    pagination,
    search,
    getForecasts,
    getForecastById,
    clearForecast,
  }
})
