<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  totalSteps: {
    type: Number,
    required: true,
  },
  finishButtonText: {
    type: String,
    default: 'Finalizar',
  },
})

const emit = defineEmits(['finish'])

const currentStep = ref<number>(1)

const nextStep = (): void => {
  if (currentStep.value < props.totalSteps) {
    currentStep.value++
  }
}

const prevStep = (): void => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const finish = (): void => {
  currentStep.value++
  emit('finish')
}
</script>

<template>
  <div class="grid justify-center">
    <!-- Indicador de Passos -->
    <div class="flex justify-center gap-10 mt-8">
      <div v-for="step in totalSteps" :key="step" class="flex items-center">
        <div
          class="flex items-center justify-center rounded-full transition-all duration-300"
          :class="{
            'bg-blue-500 w-7 h-7': currentStep === step,
            'bg-gray-300 dark:bg-gray-600 w-5 h-5': currentStep !== step,
            'border-4 border-blue-200 dark:border-blue-800': currentStep === step,
          }"
        ></div>
        <div
          v-if="step < totalSteps"
          class="flex-auto border-t-2 transition-width duration-500 ease-in-out"
          :class="step < currentStep ? 'border-blue-500' : 'border-gray-300 dark:border-gray-600'"
        ></div>
      </div>
    </div>

    <!-- Conteúdo do Passo (via Slots) -->
    <div class="mt-10 mb-5 min-h-[150px]">
      <template v-for="step in totalSteps" :key="step">
        <div v-if="currentStep === step">
          <slot :name="`step-${step}`"></slot>
        </div>
      </template>
      <div v-if="currentStep > totalSteps">
        <slot name="finish-message">
          <h2 class="text-xl font-semibold mb-4 text-green-500">Concluído!</h2>
          <p class="text-gray-600 dark:text-gray-400">Processo finalizado com sucesso.</p>
        </slot>
      </div>
    </div>

    <!-- Botões de Navegação -->
    <div class="flex justify-between mt-8">
      <button
        @click="prevStep"
        :disabled="currentStep === 1"
        class="px-6 py-2 text-white bg-gray-400 rounded hover:bg-gray-500 disabled:bg-gray-200 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
      >
        Anterior
      </button>
      <button
        v-if="currentStep < totalSteps"
        @click="nextStep"
        class="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Próximo
      </button>
      <button
        v-if="currentStep === totalSteps"
        @click="finish"
        class="px-6 py-2 text-white bg-green-500 rounded hover:bg-green-600"
      >
        {{ finishButtonText }}
      </button>
    </div>
  </div>
</template>
