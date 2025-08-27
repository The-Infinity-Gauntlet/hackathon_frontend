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
      },
      {
        path: '/admin/graficos',
        name: '',
        component: () => import('@/modules/flood_management/infra/pages/Charts.vue'),
      },
      {
        path: '/admin/registrar-ponto',
        name: 'Cadastrar um novo ponto',
        component: () => import('@/modules/flood_management/infra/pages/RegisterPoint.vue'),
      },
    ],
  },
  {
    path: '/admin/mapa-de-alagamento',
    name: '',
    component: () => import('@/modules/flood_management/infra/pages/FloodMap.vue'),
  },
]

export default routes
