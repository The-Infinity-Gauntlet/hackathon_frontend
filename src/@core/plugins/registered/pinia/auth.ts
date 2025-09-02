// import { defineStore } from 'pinia'

// export const useAuthStore = defineStore('auth', {
//   state: () => ({
//     isAuthenticated: false,
//     user: null as null | { id: number; name: string; email: string },
//   }),
//   actions: {
//     login(userData: { id: number; name: string; email: string }) {
//       this.isAuthenticated = true
//       this.user = userData
//     },
//     logout() {
//       this.isAuthenticated = false
//       this.user = null
//     },
//   },
// })

import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    login(token: string) {
      this.token = token
      localStorage.setItem('token', token)
    },
    logout() {
      this.token = null
      localStorage.removeItem('token')
    },
  },
})
