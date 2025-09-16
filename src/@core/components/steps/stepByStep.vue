<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

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

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    nextStep()
  } else if (event.key === 'Escape') {
    prevStep()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="grid justify-center lg:bg-white lg:dark:bg-[#000d19]">
    <div class="mt-8 flex justify-center gap-10">
      <div v-for="step in totalSteps" :key="step" class="flex items-center">
        <div
          class="flex items-center justify-center rounded-full transition-all duration-300"
          :class="{
            'h-7 w-7 bg-blue-500': currentStep === step,
            'h-5 w-5 bg-gray-300 dark:bg-gray-600': currentStep !== step,
            'border-4 border-blue-200 dark:border-blue-800': currentStep === step,
          }"
        ></div>
        <div
          v-if="step < totalSteps"
          class="transition-width flex-auto border-t-2 duration-500 ease-in-out"
          :class="step < currentStep ? 'border-blue-500' : 'border-gray-300 dark:border-gray-600'"
        ></div>
      </div>
    </div>

    <div class="mt-10 mb-5 min-h-[150px]">
      <template v-for="step in totalSteps" :key="step">
        <div v-if="currentStep === step">
          <slot :name="`step-${step}`"></slot>
        </div>
      </template>
      <div v-if="currentStep > totalSteps">
        <slot name="finish-message">
          <h2 class="mb-4 text-xl font-semibold text-green-500">Concluído!</h2>
          <p class="text-gray-600 dark:text-gray-400">Processo finalizado com sucesso.</p>
        </slot>
      </div>
    </div>

    <div class="flex justify-between">
      <button
        @click="prevStep"
        :disabled="currentStep === 1"
        class="rounded bg-gray-500 px-6 py-2 text-white transition-colors duration-300 hover:bg-gray-600 disabled:cursor-not-allowed disabled:bg-gray-400 dark:disabled:bg-gray-700"
      >
        Anterior
      </button>
      <button
        v-if="currentStep < totalSteps"
        @click="nextStep"
        class="rounded bg-blue-500 px-6 py-2 text-white transition-colors duration-300 hover:bg-blue-600"
      >
        Próximo
      </button>
      <button
        v-if="currentStep === totalSteps"
        @click="finish"
        class="rounded bg-green-500 px-6 py-2 text-white transition-colors duration-300 hover:bg-green-600"
      >
        {{ finishButtonText }}
      </button>
    </div>
  </div>
</template>
