import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', '/pwa_icons/apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Aqua',
        short_name: 'Aqua',
        description: 'Aqua: Análise Pluviométrica',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa_icons/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'pwa_icons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        id: 'com.analise-pluviometrica.app',
        orientation: 'any',
        background_color: '#ffffff',
        start_url: '.',
        launch_handler: {
          client_mode: ['navigate-existing', 'auto'],
        },
      },
      workbox: {
        // Adiciona o service worker do firebase ao topo do service worker gerado
        importScripts: ['firebase-messaging-sw.js'],
      },
      devOptions: {
        enabled: true,
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        // strip /api only if backend doesn't include it; here backend includes /api, so keep path
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
