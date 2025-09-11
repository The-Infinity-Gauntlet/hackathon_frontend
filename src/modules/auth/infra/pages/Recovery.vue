<script setup lang="ts">
import { ref } from 'vue'
import { BaseForm, BasePopup, StepByStep } from '@/@core/components'
import { RecoveryCodeInput } from '../components'
import type { IFormField } from '@/@core/interfaces/form'

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
  <StepByStep :total-steps="2" finish-button-text="Recuperar" @finish="handleFinish">
    <template #step-1>
      <BaseForm :form-fields="fields" />
    </template>

    <template #step-2>
      <RecoveryCodeInput />
    </template>

    <template #finish-message>
      <BasePopup title="Sua conta foi recuperada!" :showPopup="showPopup" @close="closePopup" />
    </template>
  </StepByStep>
</template>
