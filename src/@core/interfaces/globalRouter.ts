import { Router } from 'vue-router'

/**
 * Objeto global que armazena a instância do Vue Router.
 *
 * Essa estrutura é útil para acessar o roteador fora do contexto dos componentes Vue,
 * como em arquivos de serviços, stores, interceptadores de API ou middlewares personalizados.
 *
 * A propriedade `router` deve ser preenchida no momento da inicialização da aplicação,
 * geralmente após o Vue app ser montado.
 *
 * ## Exemplo de atribuição:
 * ```ts
 * import { globalRouter } from './globalRouter';
 * import router from './router';
 *
 * globalRouter.router = router;
 * ```
 *
 * ## Exemplo de uso fora de componentes:
 * ```ts
 * import { globalRouter } from './globalRouter';
 *
 * if (someCondition) {
 *   globalRouter.router?.push('/login');
 * }
 * ```
 *
 * @constant
 * @type {{ [x: string]: any; router: Router | null }}
 */
const globalRouter = { router: null } as {
  [x: string]: any
  router: null | Router
}

export { globalRouter }
