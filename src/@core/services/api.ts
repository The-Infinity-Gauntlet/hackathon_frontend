import axios, { AxiosResponse } from 'axios'
import { IApi } from '../interfaces/api'

/**
 * URL base da API utilizada por padrão na instância do cliente Axios.
 * @constant {string}
 */
const API_URL = 'http://localhost:3000/'

/**
 * Classe responsável por encapsular chamadas HTTP usando Axios.
 * Implementa a interface `IApi` com suporte a métodos padrão de requisição,
 * além de suporte especial para envio de arquivos com `multipart/form-data`.
 *
 * Esta classe pode ser injetada como serviço em sistemas que seguem arquitetura
 * modular ou baseada em DI (Inversão de Dependência).
 *
 * @implements {IApi}
 */
export class Api implements IApi {
  /**
   * Instância do cliente Axios pré-configurada com baseURL e cabeçalhos padrão.
   *
   * @type {import('axios').AxiosInstance}
   */
  client = axios.create({
    baseURL: `${API_URL}api/`,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 30000, // Timeout de 30 segundos para requisições
  })

  /**
   * Realiza uma requisição HTTP GET para a URL informada.
   *
   * @template T Tipo da resposta esperada.
   * @param {string} url - Caminho relativo ao endpoint.
   * @param {object} [headers={}] - Cabeçalhos adicionais a serem enviados.
   * @returns {Promise<AxiosResponse<T>>} - Promessa com a resposta da requisição.
   */
  async get<T = any>(url: string, headers: any = {}): Promise<AxiosResponse<T>> {
    return this.client.get(url, { headers: { ...this.client.defaults.headers, ...headers } })
  }

  /**
   * Realiza uma requisição HTTP POST com dados JSON.
   *
   * @template T Tipo da resposta esperada.
   * @param {string} url - Caminho relativo ao endpoint.
   * @param {any} data - Corpo da requisição.
   * @param {object} [headers={}] - Cabeçalhos adicionais.
   * @returns {Promise<AxiosResponse<T>>} - Promessa com a resposta da requisição.
   */
  async post<T = any>(url: string, data: any, headers: any = {}): Promise<AxiosResponse<T>> {
    return this.client.post(url, data, { headers: { ...this.client.defaults.headers, ...headers } })
  }

  /**
   * Realiza uma requisição HTTP PUT com dados para atualização.
   *
   * @template T Tipo da resposta esperada.
   * @param {string} url - Caminho relativo ao endpoint.
   * @param {any} data - Dados a serem atualizados.
   * @returns {Promise<AxiosResponse<T>>} - Promessa com a resposta da requisição.
   */
  async put<T = any>(url: string, data: any): Promise<AxiosResponse<T>> {
    return this.client.put(url, data)
  }

  /**
   * Realiza uma requisição HTTP PATCH com dados parciais para atualização.
   *
   * @template T Tipo da resposta esperada.
   * @param {string} url - Caminho relativo ao endpoint.
   * @param {any} data - Dados parciais para atualização.
   * @returns {Promise<AxiosResponse<T>>} - Promessa com a resposta da requisição.
   */
  async patch<T = any>(url: string, data: any): Promise<AxiosResponse<T>> {
    return this.client.patch(url, data)
  }

  /**
   * Realiza uma requisição HTTP DELETE para remover recursos do backend.
   *
   * @template T Tipo da resposta esperada.
   * @param {string} url - Caminho relativo ao endpoint.
   * @returns {Promise<AxiosResponse<T>>} - Promessa com a resposta da requisição.
   */
  async delete<T = any>(url: string): Promise<AxiosResponse<T>> {
    return this.client.delete(url)
  }

  /**
   * Realiza uma requisição HTTP POST com dados em `multipart/form-data`,
   * geralmente usada para envio de arquivos (como imagens).
   *
   * @template T Tipo da resposta esperada.
   * @param {string} url - Caminho relativo ao endpoint.
   * @param {any} data - Dados a serem enviados, incluindo arquivos.
   * @returns {Promise<AxiosResponse<T>>} - Promessa com a resposta da requisição.
   */
  async postImage<T = any>(url: string, data: any): Promise<AxiosResponse<T>> {
    return this.client.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}
