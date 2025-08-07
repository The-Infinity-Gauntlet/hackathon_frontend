import { IRoutes } from '@/@core/interfaces/route'

const routes: IRoutes[] = [
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('@/modules/info/infra/pages/index.vue'),
  },
  {
    path: '/post',
    name: 'Post',
    component: () => import('@/modules/info/infra/pages/Post.vue'),
  },
  {
    path: '/sobre',
    name: 'About',
    component: () => import('@/modules/info/infra/pages/About.vue'),
  },
]

export default routes
