<script setup lang="ts">
import buttonGlassmorphism from '../buttons/buttonGlassmorphism.vue'
import { useNavigation } from '../../composables/navigation'

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
</script>

<template>
  <div v-if="showPopup" class="fixed inset-0 flex items-center justify-center bg-black z-2">
    <div
      class="bg-white dark:bg-[#000d19] bg-opacity-2 rounded-lg shadow-lg w-[90%] max-w-md max-h-[90vh] overflow-y-auto flex flex-col pt-4 pb-7"
    >
      <div class="flex justify-between px-5">
        <button
          class="text-2xl text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          @click="closePopup"
        >
          ×
        </button>
      </div>

      <div class="p-5 pt-3 flex flex-col items-center gap-4">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ title }}
        </h2>
        <img v-if="gifUrl" :src="gifUrl" alt="Imagem animada" class="max-w-full rounded-md" />
      </div>

      <buttonGlassmorphism buttonText="Continuar" @click="goHome" />
    </div>
  </div>
</template>
