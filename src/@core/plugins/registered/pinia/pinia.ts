import { createPinia } from 'pinia'
import type { App } from 'vue'

/**
 * Inicializa e registra o Pinia como gerenciador de estado global na aplicação Vue.
 *
 * Essa função deve ser chamada durante o bootstrap da aplicação (normalmente no `main.ts`),
 * permitindo que os módulos e componentes utilizem os stores definidos via Pinia.
 *
 * ## Exemplo de uso:
 * ```ts
 * import { createApp } from 'vue';
 * import App from './App.vue';
 * import registerPinia from './plugins/pinia';
 *
 * const app = createApp(App);
 * registerPinia(app);
 * app.mount('#app');
 * ```
 *
 * @function
 * @param {App} app - Instância principal da aplicação Vue.
 * @returns {void}
 */
export default function registerPinia(app: App): void {
    const pinia = createPinia()
    app.use(pinia)
}
