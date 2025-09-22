<!-- <script setup lang="ts">
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
</template> -->

<script setup lang="ts">
import { ref, computed } from 'vue'
import { toast } from 'vue3-toastify'
import { BaseForm, BasePopup } from '@/@core/components'
import { RecoveryCodeInput } from '../components'
import type { IFormField } from '@/@core/interfaces/form'

const fields: IFormField[] = [
    { id: 'email', label: 'Email', placeholder: 'Digite seu email aqui', type: 'email' },
]
const recoveryCode = ref('')
console.log('Recovery code:', recoveryCode)

const isCode = ref(false)
const waveDirection = computed<'left' | 'right'>(() => {
    return isCode.value ? 'right' : 'left'
})
function toggleWave() {
    isCode.value = !isCode.value
}

const showPopup = ref(false)
const closePopup = () => {
    showPopup.value = false
}
const success = ref(false)

function handleRecovery(values: Record<string, any>) {
    console.log('Recovery values:', values)
    toggleWave()
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
    <div
        class="absolute inset-0 -z-10 hidden h-full w-full bg-contain bg-center bg-no-repeat transition-transform duration-1000 lg:block"
        :class="{
            'translate-x-[50%]': waveDirection === 'right',
            'translate-x-[-50%]': waveDirection === 'left',
        }"
        style="background-image: url('/layouts/wavesAuth.svg'); background-size: 120%"
    ></div>

    <Transition
        mode="out-in"
        enter-active-class="transition duration-500 ease-out"
        leave-active-class="transition duration-500 ease-in"
        enter-from-class="opacity-0 translate-x-10"
        enter-to-class="opacity-100 translate-x-0"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 -translate-x-10"
    >
        <div v-if="!isCode" class="grid justify-center lg:flex lg:h-screen lg:gap-[40vw]">
            <div class="grid justify-center lg:my-auto">
                <BaseForm :form-fields="fields" button-text="Continuar" @submit="handleRecovery" />
            </div>
        </div>

        <div v-else class="grid justify-center pb-20 lg:flex lg:h-screen lg:gap-200 lg:pb-0">
            <div class="grid justify-center lg:my-auto">
                <RecoveryCodeInput
                    v-model="recoveryCode"
                    :code-length="6"
                    button-text="Confirmar"
                />
                <BasePopup
                    title="Sua conta foi recuperada!"
                    :showPopup="showPopup"
                    @close="closePopup"
                    class="lg:hidden"
                />
            </div>
        </div>
    </Transition>
</template>
