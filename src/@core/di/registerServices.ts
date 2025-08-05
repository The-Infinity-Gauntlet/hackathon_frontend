import { container } from 'tsyringe'
import { Api } from '../services/api'

/**
 * Registra serviços globais no container de injeção de dependência do `tsyringe`.
 *
 * Este método registra todas as classes de serviço que devem ser resolvidas e
 * injetadas automaticamente onde forem necessárias.
 *
 * ## Serviços Registrados:
 * - `"ApiService"`: Interface pública para comunicação com APIs HTTP. Mapeada
 *   para a classe `Api`, localizada em `../services/api`.
 *
 * ## Como usar:
 * Em um módulo que deseja utilizar o serviço:
 * ```ts
 * import { container } from "tsyringe";
 * const api = container.resolve("ApiService");
 * ```
 *
 * Ou com decorators (caso esteja usando TypeScript + tsyringe):
 * ```ts
 * import { inject, injectable } from "tsyringe";
 *
 * @injectable()
 * class MyClass {
 *   constructor(
 *     @inject("ApiService") private api: Api
 *   ) {}
 * }
 * ```
 *
 * @function registerServices
 * @returns {void} Não retorna valor. Apenas registra os serviços no container.
 */
const registerServices = (): void => {
  container.register('ApiService', { useClass: Api })
}

export default registerServices
