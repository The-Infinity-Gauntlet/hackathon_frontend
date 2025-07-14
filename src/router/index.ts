import { createRouter, createWebHistory } from 'vue-router'

import authRoutes from './auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    authRoutes,
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
