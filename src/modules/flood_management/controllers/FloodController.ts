import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { container } from 'tsyringe'

import type { IFlood, IFloodControllerState } from '../interfaces/flood'
import { FloodRepository } from '../repositories/FloodRepository'

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
        loading: false,
        search: '',
    })

    const floods = computed(() => state.floods)
    const currentFlood = computed(() => state.currentFlood)
    const loading = computed(() => state.loading)

    const pagination = computed({
        get: () => state.pagination,
        set: (value) => (state.pagination = value),
    })

    const search = computed({
        get: () => state.search,
        set: (value) => (state.search = value),
    })

    const getFloods = async () => {
        state.loading = true
        const result = await floodRepository.list()
        state.floods = result.results
        state.pagination = {
            ...state.pagination,
            page: result.page_number,
            page_size: result.page_size,
            total: result.total,
            num_pages: result.num_pages,
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

    const registerFloodPoint = async (payload: Record<string, any>) => {
        try {
            state.loading = true
            const data = await floodRepository.registerFloodPoint(payload)
            console.log('Flood point registered successfully:', data)
            return data
        } catch (error) {
            console.error('Error registering flood point:', error)
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
        getFloods,
        getFloodById,
        clearCurrentFlood,
        createFlood,
        updateFlood,
        deleteFlood,
        registerFloodPoint,
    }
})
