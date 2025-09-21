import { IRoutes } from '@/@core/interfaces/route'

const routes: IRoutes[] = [
    {
        path: '/',
        component: () => import('@/@templates/layouts/Auth.vue'),
        children: [
            {
                path: '/auth',
                name: 'auth',
                component: () => import('@/modules/auth/infra/pages/Auth.vue'),
                beforeEnter: (to, from, next) => {
                    if (to.query.mode === 'login' || to.query.mode === 'register') {
                        next()
                    } else {
                        next({ name: 'NotFound' })
                    }
                },
            },
            {
                path: '/recuperacao',
                name: 'Recuperação',
                component: () => import('@/modules/auth/infra/pages/Recovery.vue'),
                meta: { requiresAuth: true },
            },
        ],
    },
]

export default routes
