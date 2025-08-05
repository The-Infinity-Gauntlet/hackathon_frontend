import { AxiosInstance, AxiosResponse } from "axios";

/**
 * Interface que define a estrutura base de um serviço de API utilizando Axios.
 *
 * Essa interface é usada para padronizar o acesso HTTP em toda a aplicação,
 * permitindo implementação desacoplada e fácil substituição ou mocking em testes.
 *
 * @interface IApi
 */
export interface IApi {
  /**
   * Instância do cliente Axios a ser usada para requisições HTTP.
   *
   * @type {AxiosInstance}
   */
  client: AxiosInstance;

  /**
   * Realiza uma requisição HTTP GET para o endpoint especificado.
   *
   * @template T Tipo de dado esperado na resposta (default: any)
   * @param {string} url - URL do recurso a ser acessado.
   * @returns {Promise<AxiosResponse<T>>} Promise contendo a resposta do Axios.
   */
  get<T = any>(url: string): Promise<AxiosResponse<T>>;

  /**
   * Realiza uma requisição HTTP POST com os dados fornecidos.
   *
   * @template T Tipo de dado esperado na resposta (default: any)
   * @param {string} url - URL do recurso a ser acessado.
   * @param {*} data - Corpo da requisição.
   * @returns {Promise<AxiosResponse<T>>} Promise contendo a resposta do Axios.
   */
  post?<T = any>(url: string, data: any): Promise<AxiosResponse<T>>;

  /**
   * Realiza uma requisição HTTP PATCH com os dados fornecidos.
   *
   * @template T Tipo de dado esperado na resposta (default: any)
   * @param {string} url - URL do recurso a ser acessado.
   * @param {*} data - Corpo da requisição.
   * @returns {Promise<AxiosResponse<T>>} Promise contendo a resposta do Axios.
   */
  patch?<T = any>(url: string, data: any): Promise<AxiosResponse<T>>;

  /**
   * Realiza uma requisição HTTP PUT com os dados fornecidos.
   *
   * @template T Tipo de dado esperado na resposta (default: any)
   * @param {string} url - URL do recurso a ser acessado.
   * @param {*} data - Corpo da requisição.
   * @returns {Promise<AxiosResponse<T>>} Promise contendo a resposta do Axios.
   */
  put?<T = any>(url: string, data: any): Promise<AxiosResponse<T>>;
}

/**
 * Interface que representa os links de paginação em uma resposta paginada da API.
 *
 * @interface ILinks
 */
interface ILinks {
  /**
   * URL da próxima página, se houver.
   * @type {string}
   */
  next: string;

  /**
   * URL da página anterior, se houver.
   * @type {string}
   */
  previous: string;
}

/**
 * Interface genérica para respostas paginadas padronizadas da API.
 *
 * @template T Tipo dos dados contidos na lista `results`.
 * @interface IGlobalResponse
 */
export interface IGlobalResponse<T> {
  /**
   * Total de registros disponíveis.
   * @type {number}
   */
  total: number;

  /**
   * Número total de páginas.
   * @type {number}
   */
  num_pages: number;

  /**
   * Página atual da resposta.
   * @type {number}
   */
  page_number: number;

  /**
   * Número de registros por página.
   * @type {number}
   */
  page_size: number;

  /**
   * Objeto com os links de navegação (próxima e anterior).
   * @type {ILinks}
   */
  links: ILinks;

  /**
   * Lista de resultados retornados na página atual.
   * @type {Array<T>}
   */
  results: Array<T>;
}
