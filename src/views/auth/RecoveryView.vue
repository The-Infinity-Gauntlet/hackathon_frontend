<script setup lang="ts">
import { ref } from 'vue';
import HeaderComp from "@/components/general/HeaderComp.vue"
import Form from '@/components/auth/Form.vue'
import RecoveryCodeInput from '@/components/auth/RecoveryCodeInput.vue'

const totalSteps = ref(2);
const currentStep = ref(1);

const nextStep = () => {
  if (currentStep.value < totalSteps.value) {
    currentStep.value++;
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
}

const finish = () => {
  // Aqui você pode enviar os dados para um servidor, por exemplo.
  currentStep.value++; // Vai para a tela de "Concluído"
}

const fields = [
  { label: 'Email', placeholder: 'Digite seu email aqui', type: 'email' },
]
</script>

<template>
  <div class="grid justify-center">
    <HeaderComp title="Recuperação" />

    <div class="flex justify-center gap-10 mt-8">
      <div v-for="step in totalSteps" :key="step" class="flex items-center">
        <div class="flex items-center justify-center rounded-full" :class="{
          'bg-blue-500 w-7 h-7': currentStep === step,
          'bg-gray-300 dark:bg-gray-600 w-5 h-5': currentStep !== step,
          'border-4 border-blue-200 dark:border-blue-800': currentStep === step
        }"></div>
        <div v-if="step < totalSteps" class="flex-auto border-t-2 transition-width duration-500 ease-in-out"
          :class="step < currentStep ? 'border-blue-500' : 'border-gray-300 dark:border-gray-600'"></div>
      </div>
    </div>


    <Form v-if="currentStep === 1" :form-fields="fields" />
    <RecoveryCodeInput v-if="currentStep === 2" />
    <div v-if="currentStep === 3" class="mt-10 mb-5">
      <h2 class="text-xl font-semibold mb-4 text-green-500">Concluído!</h2>
      <p class="text-gray-600 dark:text-gray-400">Sua conta foi recuperada com sucesso.</p>
    </div>

    <div class="flex justify-between mt-8">
      <button @click="prevStep" :disabled="currentStep === 1"
        class="px-6 py-2 text-white bg-gray-400 rounded hover:bg-gray-500 disabled:bg-gray-200 dark:disabled:bg-gray-700 disabled:cursor-not-allowed">
        Anterior
      </button>
      <button v-if="currentStep < totalSteps" @click="nextStep"
        class="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
        Próximo
      </button>
      <button v-if="currentStep === totalSteps" @click="finish"
        class="px-6 py-2 text-white bg-green-500 rounded hover:bg-green-600">
        Recuperar
      </button>
    </div>
  </div>
</template>
