import { IRoutes } from '@/@core/interfaces/route'

const routes: IRoutes[] = [
  {
    path: '/',
    component: () => import('@/@templates/layouts/Waves.vue'),
    children: [
      {
        path: '/sig-in',
        name: 'Login',
        component: () => import('@/modules/auth/infra/pages/Login.vue'),
      },
      {
        path: '/sig-up',
        name: 'Cadastro',
        component: () => import('@/modules/auth/infra/pages/Register.vue'),
      },
      {
        path: '/recuperacao',
        name: 'Recuperação',
        component: () => import('@/modules/auth/infra/pages/Recovery.vue'),
      },
    ],
  },
]

export default routes
