<script setup lang="ts">
import { ref } from 'vue'
import stepByStep from '@/@core/components/steps/stepByStep.vue'
import baseForm from '@/@core/components/forms/baseForm.vue'
import RecoveryCodeInput from '../components/RecoveryCodeInput.vue'
import type { IFormField } from '@/@core/interfaces/form'
import basePopup from '@/@core/components/popups/basePopup.vue'

const fields: IFormField[] = [
  { id: 'email', label: 'Email', placeholder: 'Digite seu email aqui', type: 'email' },
]

const showPopup = ref(false)

const closePopup = () => {
  showPopup.value = false
}

const handleFinish = () => {
  showPopup.value = true
}
</script>

<template>
  <stepByStep :total-steps="2" finish-button-text="Recuperar" @finish="handleFinish">
    <template #step-1>
      <baseForm :form-fields="fields" />
    </template>

    <template #step-2>
      <RecoveryCodeInput />
    </template>

    <template #finish-message>
      <basePopup title="Sua conta foi recuperada!" :showPopup="showPopup" @close="closePopup" />
    </template>
  </stepByStep>
</template>
