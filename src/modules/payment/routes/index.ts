import { IRoutes } from '@/@core/interfaces/route'

const routes: IRoutes[] = [
  {
    path: '/',
    component: () => import('@/@templates/layouts/Waves.vue'),
    children: [
      {
        path: '/pagamento',
        name: 'Payment',
        component: () => import('@/modules/payment/infra/pages/index.vue'),
      },
    ],
  },
]

export default routes
