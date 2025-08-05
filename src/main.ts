import 'reflect-metadata'
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

import registerServices from './@core/di/registerServices';
import { registerPlugins } from "./@core/plugins/registerPlugins";
import { createApp } from "vue";


import App from "./App.vue";

const app = createApp(App);

registerPlugins(app);
registerServices();
app.mount("#app");
