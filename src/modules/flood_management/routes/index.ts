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
    ],
  },
]

export default routes
