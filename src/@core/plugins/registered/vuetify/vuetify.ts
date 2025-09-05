// // Importação dos estilos do Vuetify
// import 'vuetify/styles'

// // Importação dos ícones da biblioteca Material Design Icons (MDI)
// import '@mdi/font/css/materialdesignicons.css'

// // Função de criação da instância do Vuetify
// import { createVuetify } from 'vuetify'

// // Importação dos pacotes de localização (idiomas) para suporte multilíngue
// import { pt, en } from 'vuetify/locale'

// // Tipo da instância principal da aplicação Vue
// import type { App } from 'vue'

// import * as components from 'vuetify/components'

// /**
//  * Instância do Vuetify configurada com tema, idioma e componentes personalizados.
//  *
//  * - Define o tema padrão como `dark`.
//  * - Define o idioma principal como `pt` (Português), com fallback para `en` (Inglês).
//  * - Inclui componentes laboratoriais úteis para manipulação de datas e horários.
//  *
//  * @see https://vuetifyjs.com/en/introduction/why-vuetify/
//  */
// const vuetify = createVuetify({
//   theme: {
//     defaultTheme: 'light',
//   },
//   locale: {
//     /** Define o idioma padrão da interface do Vuetify */
//     locale: 'pt',

//     /** Idioma alternativo caso traduções em 'pt' estejam ausentes */
//     fallback: 'en',

//     /** Registros de mensagens para os idiomas suportados */
//     messages: { pt, en },
//   },
//   components: {
//     ...components,
//   },
// })

// /**
//  * Função de instalação do Vuetify na instância principal do Vue.
//  *
//  * Essa função deve ser chamada no `main.ts` para aplicar o Vuetify como plugin da aplicação.
//  *
//  * @param {App} app - Instância raiz da aplicação Vue.
//  *
//  * @example
//  * import { createApp } from 'vue';
//  * import App from './App.vue';
//  * import installVuetify from './plugins/vuetify';
//  *
//  * const app = createApp(App);
//  * installVuetify(app);
//  * app.mount('#app');
//  */
// export default function installVuetify(app: App) {
//   app.use(vuetify)
// }
