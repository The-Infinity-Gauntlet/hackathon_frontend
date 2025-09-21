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

const success = ref(false)

function handleRecovery(values: Record<string, any>) {
    console.log('Recovery values:', values)
}

const handleFinish = () => {
    showPopup.value = true
    success.value = true
    if (success.value) {
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
        <div class="lg:my-[30vh] lg:ml-[6.25vw]">
            <h1 class="hidden text-center text-2xl font-semibold lg:block">Recuperação</h1>
            <StepByStep :total-steps="2" finish-button-text="Recuperar" @finish="handleFinish">
                <template #step-1>
                    <BaseForm :form-fields="fields" @submit="handleRecovery" />
                </template>

                <template #step-2>
                    <RecoveryCodeInput />
                </template>

                <template #finish-message>
                    <BasePopup
                        title="Sua conta foi recuperada!"
                        :showPopup="showPopup"
                        @close="closePopup"
                        class="lg:hidden"
                    />
                </template>
            </StepByStep>
        </div>
    </div>
</template>
