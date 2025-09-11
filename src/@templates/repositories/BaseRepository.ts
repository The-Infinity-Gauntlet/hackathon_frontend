import { inject, injectable } from 'tsyringe'
import { Api } from '@/@core/services/api'
import { IGlobalResponse } from '@/@core/interfaces/api'

/**
 * Classe base genérica para operações CRUD (Create, Read, Update, Delete).
 *
 * Essa classe é pensada para ser estendida por repositórios específicos (ex: `UserRepository`, `ProductRepository`)
 * permitindo o reaproveitamento das operações básicas de comunicação com a API.
 *
 * O tipo genérico `<T>` representa o tipo da entidade a ser manipulada.
 *
 * @template T Tipo do modelo manipulado pelo repositório (ex: User, Product, etc.).
 */
@injectable()
export class BaseRepository<T> {
  /**
   * Cria uma instância do repositório base.
   *
   * @param {Api} api - Serviço de API injetado via container `tsyringe`.
   * @param {string} basePath - Caminho base do endpoint da API para a entidade (ex: `"users/"`, `"products/"`).
   */
  constructor(
    @inject('ApiService') protected api: Api,
    private readonly basePath: string,
  ) {}

  /**
   * Recupera uma lista paginada de itens do backend.
   *
   * @returns {Promise<IGlobalResponse<T>>} Um objeto de resposta com dados paginados (e metadados, se houver).
   */
  async list(): Promise<IGlobalResponse<T>> {
    const { data } = await this.api.get<IGlobalResponse<T>>(`${this.basePath}`)
    return data
  }

  /**
   * Recupera todos os itens da entidade sem paginação.
   *
   * @returns {Promise<T[]>} Lista completa de objetos da entidade.
   */
  async listAll(): Promise<T[]> {
    const { data } = await this.api.get<T[]>(`${this.basePath}all/`)
    return data
  }

  /**
   * Busca um item específico pelo seu identificador único.
   *
   * @param {string} id - Identificador único do item.
   * @returns {Promise<T>} Objeto correspondente ao ID fornecido.
   */
  async getById(id: string): Promise<T> {
    const { data } = await this.api.get<T>(`${this.basePath}${id}/`)
    return data
  }

  /**
   * Cria um novo item no backend.
   *
   * @param {Partial<T>} payload - Dados parciais para criação do novo item.
   * @returns {Promise<T>} Item recém-criado.
   */
  async create(payload: Partial<T>): Promise<T> {
    const { data } = await this.api.post<T>(`${this.basePath}`, payload)
    return data
  }

  /**
   * Atualiza parcialmente um item existente.
   *
   * @param {string} id - Identificador do item a ser atualizado.
   * @param {Partial<T>} payload - Campos que devem ser atualizados.
   * @returns {Promise<T>} Objeto atualizado.
   */
  async update(id: string, payload: Partial<T>): Promise<T> {
    const { data } = await this.api.patch<T>(`${this.basePath}${id}/`, payload)
    return data
  }

  /**
   * Remove um item da base de dados pelo seu identificador.
   *
   * @param {string} id - Identificador do item a ser removido.
   * @returns {Promise<void>} Promise resolvida após exclusão (sem retorno).
   */
  async delete(id: string): Promise<void> {
    await this.api.delete(`${this.basePath}${id}/`)
  }

  /**
   * Realiza uma busca utilizando um termo simples via query string.
   *
   * Exemplo de uso: `search("João")` resultaria em `/entidade?search=João`.
   *
   * @param {string} search - Termo de busca textual.
   * @returns {Promise<IGlobalResponse<T>>} Resultado da busca paginada.
   */
  async search(search: string): Promise<IGlobalResponse<T>> {
    const { data } = await this.api.get<IGlobalResponse<T>>(`${this.basePath}?search=${search}`)
    return data
  }
}
