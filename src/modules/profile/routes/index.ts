import { IRoutes } from '@/@core/interfaces/route'

const routes: IRoutes[] = [
  {
    path: '/minha-conta',
    name: 'Meu perfil',
    component: () => import('@/modules/profile/infra/pages/index.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/modules/profile/infra/pages/Dashboard.vue'),
  },
  {
    path: '/seguranca',
    name: 'Segurança',
    component: () => import('@/modules/profile/infra/pages/Security.vue'),
  },
]

export default routes
