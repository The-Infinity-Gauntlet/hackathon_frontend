import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { container } from 'tsyringe'
import type { Feature } from 'geojson'

import type { IFlood, IFloodControllerState, IFloodIAControllerState } from '../interfaces/flood'
import { FloodRepository, FloodIARepository } from '../repositories/FloodRepository'

export const useFloodController = defineStore('flood', () => {
  const floodRepository = container.resolve(FloodRepository)

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
    set: (value) => { state.polygon = value },
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
  }

  const clearPolygon = () => {
    state.polygon = null
  }

  const getFloods = async () => {
    state.loading = true
    const result = await floodRepository.list()
    state.floods = result.results
    state.pagination = {
      ...state.pagination,
      page: result.page_number,
      pageSize: result.page_size,
      //total: result.total,
      //num_pages: result.num_pages,
    }
    state.loading = false
  }

  const getFloodById = async (id: string) => {
    state.loading = true
    const result = await floodRepository.getById(id)
    state.currentFlood = result
    state.loading = false
    return result
  }

  const clearCurrentFlood = () => {
    state.currentFlood = {}
  }

  const createFlood = async (flood: Partial<IFlood>) => {
    try {
      console.log('Creating flood:', flood)

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
    clearForecast
  }
})
