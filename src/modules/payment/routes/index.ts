import { IRoutes } from '@/@core/interfaces/route'

const routes: IRoutes[] = [
    {
        path: '/',
        component: () => import('@/@templates/layouts/Payment.vue'),
        children: [
            {
                path: '/pagamento',
                name: 'Pagamento',
                component: () => import('@/modules/payment/infra/pages/index.vue'),
                meta: { requiresAuth: true },
                children: [ 
                    {
                        path: 'formas-de-pagamento',
                        name: 'Métodos',
                        component: () => import('@/modules/payment/infra/components/paymentMethod.vue')
                    },
                    {
                        path: 'pix',
                        name: 'Pix',
                        component: () => import('@/modules/payment/infra/pages/pixPayment.vue'),
                    }
                ]
            },
        ],
    },
]

export default routes
