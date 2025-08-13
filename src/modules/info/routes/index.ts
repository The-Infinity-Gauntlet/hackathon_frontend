import { IRoutes } from '@/@core/interfaces/route'

const routes: IRoutes[] = [
  {
    path: '/',
    component: () => import('@/@templates/layouts/Default.vue'),
    children: [
      {
        path: '/blog',
        name: '',
        component: () => import('@/modules/info/infra/pages/index.vue'),
      },
      {
        path: '/post',
        name: '',
        component: () => import('@/modules/info/infra/pages/Post.vue'),
      },
      {
        path: '/sobre',
        name: 'Sobre Nós',
        component: () => import('@/modules/info/infra/pages/About.vue'),
      },
    ],
  },
]

export default routes
