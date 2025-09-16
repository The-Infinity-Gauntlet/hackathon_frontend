import '@/@core/assets/main.css'
import 'reflect-metadata'
import '@mdi/font/css/materialdesignicons.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'vue3-toastify/dist/index.css'

import registerServices from './@core/di/registerServices'
import { registerPlugins } from './@core/plugins/registerPlugins'
import { createApp } from 'vue'

import PrimeVue from 'primevue/config'
import App from './App.vue'

import { initializeApp } from 'firebase/app'
import { getMessaging, onMessage } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

const firebaseApp = initializeApp(firebaseConfig)
const messaging = getMessaging(firebaseApp)

onMessage(messaging, (payload) => {
  console.log('Message received in foreground: ', payload)
})

const app = createApp(App)

registerPlugins(app)
registerServices()
app.use(PrimeVue)
app.mount('#app')
