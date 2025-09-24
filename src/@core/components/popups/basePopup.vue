<script setup lang="ts">
import { ButtonGlassmorphism } from '@/@core/components'
import { useNavigation } from '@/@core/composables/navigation'

const props = defineProps({
    title: {
        type: String,
        default: '',
    },
    text: {
        type: String,
        default: '',
    },
    gifUrl: {
        type: String,
        default: '/icons/logo.svg',
    },
    showPopup: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(['close'])
const { goHome } = useNavigation()

const closePopup = () => {
    emit('close')
}

const handleOverlayClick = (event: MouseEvent) => {
    if ((event.target as HTMLElement).id === 'overlay') {
        emit('close')
    }
}
</script>

<template>
    <div
        id="overlay"
        v-if="showPopup"
        class="fixed inset-0 z-20 flex items-center justify-center bg-black/80"
        @click="handleOverlayClick"
    >
        <div
            class="flex max-h-[90vh] w-[90%] max-w-md flex-col overflow-y-auto rounded-lg bg-white pt-4 pb-7 shadow-lg dark:bg-[#000d19]"
        >
            <div class="flex justify-between px-5">
                <button
                    class="text-2xl text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    @click="closePopup"
                >
                    ×
                </button>
            </div>

            <div class="flex flex-col items-center gap-4 p-5 pt-3 pb-0">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                    {{ title }}
                </h2>
                <img v-if="gifUrl" :src="gifUrl" alt="gif" class="w-50 rounded-md" />
                <p class="text-center font-semibold text-gray-900 dark:text-white">{{ text }}</p>
            </div>

            <ButtonGlassmorphism buttonText="Continuar" @click="goHome" />
        </div>
    </div>
</template>
