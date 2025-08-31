import { IRoutes } from '@/@core/interfaces/route'

const routes: IRoutes[] = [
  {
    path: '/monitoramento',
    name: 'Dashboard de Câmeras',
    component: () => import('../infra/pages/CameraDashboard.vue'),
  },
]

export default routes
