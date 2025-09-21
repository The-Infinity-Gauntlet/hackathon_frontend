<script setup lang="ts">
import { useNavigation } from '@/@core/composables/navigation'

const { goHome } = useNavigation()
</script>

<template>
    <div
        class="flex min-h-screen flex-col items-center justify-center p-6 text-center dark:bg-[#000d19]"
    >
        <h1 class="mb-4 text-6xl font-extrabold dark:text-white">404</h1>
        <p class="mb-6 text-xl text-gray-600 dark:text-gray-300">Ops! Página não encontrada.</p>
        <p class="mb-8 text-gray-500 dark:text-gray-400">
            A página que você está procurando não existe ou foi movida.
        </p>
        <button
            @click="goHome"
            class="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow transition-colors hover:bg-blue-700"
        >
            Voltar para a página inicial
        </button>
    </div>
</template>
