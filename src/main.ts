import '@/@core/assets/main.css'
import 'reflect-metadata'
import '@mdi/font/css/materialdesignicons.css'
import 'mapbox-gl/dist/mapbox-gl.css'

import registerServices from './@core/di/registerServices'
import { registerPlugins } from './@core/plugins/registerPlugins'
import { createApp } from 'vue'

import PrimeVue from 'primevue/config'
import App from './App.vue'

const app = createApp(App)

registerPlugins(app)
registerServices()
app.use(PrimeVue)
app.mount('#app')
