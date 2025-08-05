import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { container } from 'tsyringe'

import type { IAuth } from '../interfaces/auth'
import { AuthRepository } from '../repositories/AuthRepository'

export interface IAuthControllerState {
  auths: IAuth[]
  currentAuth: Partial<IAuth>
  pagination: {
    page: number
    pageSize: number
    offset: number
    limit: number
  }
  loading: boolean
  search: string
}

export const useAuthController = defineStore('auth', () => {
  const authRepository = container.resolve(AuthRepository)

  const state = reactive<IAuthControllerState>({
    auths: [],
    currentAuth: {},
    pagination: {
      page: 1,
      pageSize: 100,
      offset: 0,
      limit: 10,
    },
    loading: false,
    search: '',
  })

  const auths = computed(() => state.auths)
  const currentAuth = computed(() => state.currentAuth)
  const loading = computed(() => state.loading)

  const pagination = computed({
    get: () => state.pagination,
    set: (value) => (state.pagination = value),
  })

  const search = computed({
    get: () => state.search,
    set: (value) => (state.search = value),
  })

  const getAuths = async () => {
    state.loading = true
    const result = await authRepository.list()
    state.auths = result.results
    state.pagination = {
      ...state.pagination,
      page: result.page_number,
      page_size: result.page_size,
      total: result.total,
      num_pages: result.num_pages,
    }
    state.loading = false
  }

  const getAuthById = async (id: string) => {
    state.loading = true
    const result = await authRepository.getById(id)
    state.currentAuth = result
    state.loading = false
    return result
  }

  const clearCurrentAuth = () => {
    state.currentAuth = {}
  }

  const createAuth = async (auth: Partial<IAuth>) => {
    try {
      console.log('Creating auth:', auth)

      state.loading = true
      const data = await authRepository.create(auth)
      await getAuths()
      return data
    } catch (error) {
      throw error
    } finally {
      state.loading = false
    }
  }

  const updateAuth = async (id: string, auth: Partial<IAuth>) => {
    try {
      state.loading = true
      const data = await authRepository.update(id, auth)
      await getAuths()
      return data
    } catch (error) {
      throw error
    } finally {
      state.loading = false
    }
  }

  const deleteAuth = async (id: string) => {
    try {
      state.loading = true
      await authRepository.delete(id)
      await getAuths()
    } catch (error) {
      throw error
    } finally {
      state.loading = false
    }
  }

  return {
    state,
    auths,
    currentAuth,
    pagination,
    loading,
    search,
    getAuths,
    getAuthById,
    clearCurrentAuth,
    createAuth,
    updateAuth,
    deleteAuth,
  }
})
