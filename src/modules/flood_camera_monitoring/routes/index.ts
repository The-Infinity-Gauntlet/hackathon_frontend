import { IRoutes } from '@/@core/interfaces/route'

const routes: IRoutes[] = [
  {
    path: '/',
    component: () => import('@/@templates/layouts/Default.vue'),
    children: [
      {
        path: '/cameras',
        name: '',
        component: () => import('../infra/pages/StreamingStreets.vue'),
      },
      {
        path: '/cameras/:id',
        name: '',
        props: true,
        component: () => import('../infra/pages/InfoCamera.vue'),
      },
    ],
  },
]

export default routes
