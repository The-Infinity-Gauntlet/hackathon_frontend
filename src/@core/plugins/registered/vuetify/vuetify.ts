// // Importação dos estilos do Vuetify
// import 'vuetify/styles';

// // Importação dos ícones da biblioteca Material Design Icons (MDI)
// import '@mdi/font/css/materialdesignicons.css';

// // Função de criação da instância do Vuetify
// import { createVuetify } from 'vuetify';

// // Importação dos pacotes de localização (idiomas) para suporte multilíngue
// import { pt, en } from 'vuetify/locale';

// // Tipo da instância principal da aplicação Vue
// import type { App } from 'vue';

// // Importação dos componentes laboratoriais do Vuetify (ainda em estágio experimental)
// import { VCalendar, VDateInput, VTimePicker } from 'vuetify/labs/components';

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
//     /** Define o tema escuro como o tema padrão da aplicação */
//     defaultTheme: 'dark',
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
//     /** Componente de calendário experimental */
//     VCalendar,

//     /** Componente de entrada de data (datepicker) experimental */
//     VDateInput,

//     /** Componente de seleção de horário experimental */
//     VTimePicker,
//   },
// });

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
//   app.use(vuetify);
// }
