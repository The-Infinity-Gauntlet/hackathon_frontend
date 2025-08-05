import { ComputedRef } from "vue";

/**
 * Interface para o store da aplicação principal utilizando Composition API.
 *
 * Fornece acesso ao estado dinâmico e ao indicador de carregamento como uma `ComputedRef`.
 *
 * @interface IUseAppStore
 */
export interface IUseAppStore {
  /**
   * Objeto contendo o estado genérico da aplicação.
   * As chaves são dinâmicas e os valores podem ser de qualquer tipo.
   *
   * @type {{ [key: string]: any }}
   */
  state: { [key: string]: any };

  /**
   * Propriedade computada que indica se há alguma operação em andamento.
   *
   * @type {ComputedRef<boolean>}
   */
  loading: ComputedRef<boolean>;
}

/**
 * Interface que define o estado interno base da aplicação.
 *
 * @interface IAppState
 */
export interface IAppState {
  /**
   * Flag genérica usada como constante (o nome pode ser ajustado para refletir sua finalidade real).
   *
   * @type {boolean}
   */
  const: boolean;

  /**
   * Indica se a aplicação está em estado de carregamento.
   *
   * @type {boolean}
   */
  loading: boolean;
}

/**
 * Interface de paginação padronizada para listas com suporte a ordenação.
 *
 * @interface IPagination
 */
export interface IPagination {
  /**
   * Página atual.
   *
   * @type {number}
   */
  page: number;

  /**
   * Número de itens por página.
   *
   * @type {number}
   */
  page_size: number;

  /**
   * Total de registros disponíveis.
   *
   * @type {number}
   */
  total: number;

  /**
   * Número total de páginas.
   *
   * @type {number}
   */
  num_pages: number;

  /**
   * Lista de campos pelos quais a ordenação está sendo aplicada.
   *
   * @type {Array<string>}
   */
  sortBy: Array<string>;

  /**
   * Indica, para cada campo em `sortBy`, se a ordenação é descendente (`true`) ou ascendente (`false`).
   *
   * @type {Array<boolean>}
   */
  sortDesc: Array<boolean>;
}

/**
 * Interface que representa a definição de uma coluna (header) em uma tabela dinâmica.
 *
 * @interface IHeader
 */
export interface IHeader {
  /**
   * Identificador único da coluna.
   *
   * @type {number}
   */
  id: number;

  /**
   * Título que será exibido na interface para o cabeçalho da coluna.
   *
   * @type {string}
   */
  title: string;

  /**
   * Chave de acesso no objeto de dados correspondente a essa coluna.
   *
   * @type {string}
   */
  value: string;

  /**
   * Ordem de exibição da coluna na tabela.
   *
   * @type {number}
   */
  sequence: number;

  /**
   * Define se a coluna está visível na tabela.
   *
   * @type {boolean}
   */
  isVisible: boolean;

  /**
   * Indica se a coluna pode ser ordenada.
   *
   * @type {boolean}
   */
  sortable: boolean;

  /**
   * Conjunto de funções de validação aplicadas aos valores dessa coluna.
   * Cada função deve retornar `true` para valor válido ou uma `string` com mensagem de erro.
   *
   * @type {Array<(v: string) => boolean | string>}
   * @optional
   */
  rules?: Array<(v: string) => boolean | string>;
}
