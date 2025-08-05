import { IRoutes } from "@/@core/interfaces/route";

const routes: IRoutes[] = [
  {
    path: "/auth",
    name: "auth",
    component: () => import("@/modules/auth/infra/pages/index.vue"),
  },
  {
    path: "/auth/:id",
    name: "auth-detail",
    component: () => import("@/modules/auth/infra/pages/ViewAuthDetails.vue"),
  }
];

export default routes;
