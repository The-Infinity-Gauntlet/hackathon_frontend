/**
 * Interface que representa a definição de uma rota para uso com o `vue-router`.
 *
 * Essa interface tipa os objetos de rota utilizados para configurar as rotas da aplicação,
 * fornecendo informações como caminho, nome identificador, componente associado e propriedades adicionais.
 *
 * @interface IRoutes
 */
export interface IRoutes {
  /**
   * Caminho da URL que será associado à rota.
   *
   * Exemplo: `/dashboard`, `/login`, etc.
   *
   * @type {string}
   */
  path: string

  /**
   * Nome único da rota, usado para navegação programática (e.g., `router.push({ name: 'home' })`).
   *
   * @type {string}
   */
  name?: string

  /**
   * Função que retorna o componente a ser renderizado para essa rota.
   *
   * Essa função deve ser usada para **lazy loading** dos componentes via import dinâmico:
   * ```ts
   * component: () => import('@/pages/Home.vue')
   * ```
   *
   * Se for usada como `() => void`, certifique-se de que um sistema de injeção tratará o carregamento.
   *
   * @type {() => void}
   */

  /**
   * Rotas filhas (sub-rotas) associadas a esta rota.
   *
   * Permite criar rotas aninhadas, onde cada objeto segue a interface IRoutes.
   *
   * @type {IRoutes[]}
   * @optional
   */
  children?: IRoutes[]

  component: () => void

  /**
   * Indica se os parâmetros da rota devem ser passados como props para o componente.
   *
   * Quando `true`, o Vue Router passará os parâmetros (ex: `route.params`) como `props`.
   *
   * @type {boolean}
   * @optional
   */
  props?: boolean
}
