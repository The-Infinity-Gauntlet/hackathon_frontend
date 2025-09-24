import { IRoutes } from '@/@core/interfaces/route'

const routes: IRoutes[] = [
    {
        path: '/pagamento',
        name: 'Pagamento',
        meta: { requiresAuth: true },
        component: () => import('@/@templates/layouts/Payment.vue'),
        children: [
            {
                path: '',
                name: 'Métodos',
                component: () => import('@/modules/payment/infra/pages/index.vue'),
            },
            {
                path: 'pix',
                name: 'Pix',
                component: () => import('@/modules/payment/infra/pages/pixPayment.vue'),
            },
        ],
    },
]

export default routes
