import { createRouter, createWebHistory } from 'vue-router';
import type { App } from 'vue';

/*
 * Módulos de rotas carregados dinamicamente.
 * Usa Vite `import.meta.glob` com a opção `eager: true` para importar os arquivos de rota
 * de todos os módulos localizados em `@/modules/nome-do-modulo/routes/index.ts` de forma síncrona.
 *
 * @type {Record<string, { default: import('vue-router').RouteRecordRaw[] }>}
 */
const routeModules = import.meta.glob('@/modules/*/routes/index.ts', { eager: true });

// Coleta e combina todas as rotas dos módulos em um único array
/**
 * Array contendo todas as rotas importadas dos módulos.
 * Caso um módulo não possua rotas exportadas como `default`, é ignorado.
 *
 * @type {import('vue-router').RouteRecordRaw[]}
 */
const moduleRoutes = Object.values(routeModules).flatMap((mod: any) => mod.default || []);

// Criação da instância do Vue Router
/**
 * Instância principal do Vue Router.
 * Define o modo de histórico usando `createWebHistory` e configura as rotas iniciais.
 * A rota raiz `'/'` carrega a página principal (`index.vue`) e as demais rotas vêm dos módulos.
 *
 * @type {import('vue-router').Router}
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/@templates/infra/pages/index.vue'),
    },
    ...moduleRoutes,
  ],
});

/**
 * Função responsável por registrar o Vue Router na instância principal do Vue.
 *
 * @param {App} app - Instância principal da aplicação Vue.
 *
 * @example
 * import { createApp } from 'vue';
 * import App from './App.vue';
 * import installRouter from './router';
 *
 * const app = createApp(App);
 * installRouter(app);
 * app.mount('#app');
 */

export default function (app: App) {
  app.use(router);
}
