import { IRoutes } from '@/@core/interfaces/route'

const routes: IRoutes[] = [
  {
    path: '/',
    component: () => import('@/@templates/layouts/Default.vue'),
    children: [
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
      {
        path: '/suporte',
        name: 'Suporte',
        component: () => import('@/modules/profile/infra/pages/Suport.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/@templates/layouts/Profile.vue'),
    children: [
      {
        path: '/minha-conta/:id',
        name: 'Perfil',
        component: () => import('@/modules/profile/infra/pages/Profile.vue'),
      },
    ],
  },
]

export default routes
