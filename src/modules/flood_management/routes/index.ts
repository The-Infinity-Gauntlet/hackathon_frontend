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
        //meta: { requiresAuth: true, role: 'admin' },
      },
      {
        path: '/admin/graficos',
        name: '',
        component: () => import('@/modules/flood_management/infra/pages/Charts.vue'),
        meta: { requiresAuth: true, role: 'admin' },
      },
      {
        path: '/admin/registrar-ponto',
        name: 'Cadastrar um novo ponto',
        component: () => import('@/modules/flood_management/infra/pages/RegisterPoint.vue'),
      },
      {
        path: '/admin/registrar-ocorrencia',
        name: 'Cadastrar ocorrência',
        component: () => import('@/modules/flood_management/infra/pages/RegisterIncident.vue'),
      },
      {
        path: '/admin/historico',
        name: 'Históricos',
        component: () => import('@/modules/flood_management/infra/pages/History.vue'),
      },
      {
        path: '/admin/dados-cadastrados/:id',
        name: '',
        component: () => import('@/modules/flood_management/infra/pages/RegisteredData.vue'),
        props: true,
      },
      {
        path: '/admin/editar-clima',
        name: 'Editar clima',
        component: () => import('@/modules/flood_management/infra/pages/EditWeather.vue'),
      },
      {
        path: '/admin/registrar-notificacao',
        name: 'Cadastrar notificação',
        component: () => import('@/modules/flood_management/infra/pages/RegisterNotification.vue'),
      },
    ],
  },
  {
    path: '/admin/mapa-de-alagamento',
    name: '',
    component: () => import('@/modules/flood_management/infra/pages/FloodMap.vue'),
    //meta: { requiresAuth: true, role: 'admin' },
  },
]

export default routes
