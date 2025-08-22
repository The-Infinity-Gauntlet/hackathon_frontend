<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
const routes = [
  // Geral
  { path: '/', name: 'Home' },
  { path: '/x', name: 'NotFound' },

  // Auth
  { path: '/entrar', name: 'Login' },
  { path: '/cadastrar', name: 'Cadastro' },
  { path: '/recuperacao', name: 'Recuperação' },

  // Info
  { path: '/blog', name: 'HomeBlog' },
  { path: '/post', name: 'Post' },
  { path: '/sobre', name: 'About' },

  // Payment
  { path: '/pagamento', name: 'Payment' },

  // Profile
  { path: '/minha-conta', name: 'HomeProfile' },
  { path: '/minha-conta/:id', name: 'Profile' },
  { path: '/dashboard', name: 'Chart' },
  { path: '/seguranca', name: 'Security' },
  { path: '/suporte', name: 'Suport' },
  { path: '/suporte/registro', name: 'Ticket' },
  { path: '/suporte/enviar-mensagem', name: 'Message' },

  // Flood Management
  { path: '/admin', name: 'HomeAdmin' },
]
</script>

<template>
  <div>
    <button @click="isOpen = !isOpen" type="button" class="focus:outline-none">
      <svg v-if="!isOpen" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
      <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
  <div
    v-if="isOpen"
    class="absolute top-13 left-0 z-5 mt-2 grid h-50 w-33 overflow-scroll rounded bg-gray-700 shadow-lg"
  >
    <RouterLink v-for="route in routes" :key="route.path" :to="route.path" class="px-4 py-2"
      >{{ route.name }}
    </RouterLink>
  </div>
</template>
