import { IRoutes } from '@/@core/interfaces/route'

const routes: IRoutes[] = [
  {
    path: '/',
    component: () => import('@/@templates/layouts/Default.vue'),
    children: [
      {
        path: '/admin',
        name: '',
        component: () => import('@/modules/flood_management/infra/pages/index.vue'),
        meta: { requiresAuth: true, role: 'admin' },
      },
      {
        path: '/admin/graficos',
        name: '',
        component: () => import('@/modules/flood_management/infra/pages/Charts.vue'),
        meta: { requiresAuth: true, role: 'admin' },
      },
      {
        path: '/admin/registrar-ponto',
        name: 'Cadastrar um novo ponto',
        component: () => import('@/modules/flood_management/infra/pages/RegisterPoint.vue'),
        meta: { requiresAuth: true, role: 'admin' },
      },
    ],
  },
  {
    path: '/admin/mapa-de-alagamento',
    name: '',
    component: () => import('@/modules/flood_management/infra/pages/FloodMap.vue'),
    meta: { requiresAuth: true, role: 'admin' },
  },
]

export default routes
