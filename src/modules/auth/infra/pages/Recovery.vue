<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
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

const sucess = ref(false)

const handleFinish = () => {
  showPopup.value = true
  sucess.value = true
  if (sucess.value) {
    toast.success('Conta recuperada com sucesso!', {
      autoClose: 2000,
      position: 'top-right',
      theme: 'light',
    })
  } else {
    toast.warn('Conta não recuperada!', {
      autoClose: 2000,
      position: 'top-right',
      theme: 'light',
    })
  }
}
</script>

<template>
  <div class="grid justify-center lg:min-h-screen lg:justify-start">
    <StepByStep :total-steps="2" finish-button-text="Recuperar" @finish="handleFinish" class="lg:my-auto">
      <template #step-1>
        <BaseForm :form-fields="fields" />
      </template>

      <template #step-2>
        <RecoveryCodeInput />
      </template>

      <template #finish-message>
        <BasePopup title="Sua conta foi recuperada!" :showPopup="showPopup" @close="closePopup" class="lg:hidden" />
      </template>
    </StepByStep>
  </div>
</template>
