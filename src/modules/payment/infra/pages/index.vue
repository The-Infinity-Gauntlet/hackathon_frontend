<script setup lang="ts">
import { ref } from 'vue'
import { BaseForm, StepByStep } from '@/@core/components'
import { PaymentMethod, PurchaseDetails, QrCode } from '../components'
import type { IFormField } from '@/@core/interfaces/form'

const payForms = [
    { id: 1, icon: '/payment/card.svg', name: 'Cartão' },
    { id: 2, icon: '/payment/pix.svg', name: 'Pix' },
    { id: 3, icon: '/payment/bank_slip.svg', name: 'Boleto' },
]

const fieldsStep2: IFormField[] = [
    {
        id: 'name',
        label: 'Nome do titular',
        placeholder: 'Digite o nome do titular aqui',
        type: 'text',
        autocomplete: 'name',
    },
    {
        id: 'card',
        label: 'Número do cartão',
        placeholder: 'xxxx xxxx xxxx xxxx',
        type: 'number',
        autocomplete: 'card',
    },
    {
        id: 'date',
        label: 'Data de validade (MM/AA)',
        type: 'select',
        options: [
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro',
        ],
    },
    {
        id: 'cpf',
        label: 'CPF do titular',
        placeholder: 'xxx.xxx.xxx-xx',
        type: 'number',
        autocomplete: 'cpf',
    },
    {
        id: 'seguranca',
        label: 'Código de segurança (CVV)',
        placeholder: 'xxx',
        type: 'number',
        autocomplete: 'seguranca',
    },
    {
        id: 'bank',
        label: 'Banco Emissor',
        name: 'Banco',
        type: 'select',
        options: [
            'Banco do Brasil',
            'Caixa Econômica Federal',
            'Itaú Unibanco',
            'Bradesco',
            'Santander Brasil',
            'Banco Safra',
            'Banco BTG Pactual',
            'Banco Pan',
            'Banco Inter',
            'Nubank',
            'C6 Bank',
            'Banco Original',
            'PagBank (PagSeguro)',
            'Neon',
            'Banco Modal',
            'Banco BMG',
            'Banco Mercantil do Brasil',
            'Banco Votorantim (BV)',
            'Banco Daycoval',
            'Banco do Nordeste',
        ],
    },
    {
        id: 'email',
        label: 'Email',
        placeholder: 'Digite seu email aqui',
        type: 'email',
        autocomplete: 'email',
    },
]

const fieldsStep3: IFormField[] = [
    {
        id: 'name',
        label: 'Nome do titular',
        placeholder: 'Digite o nome do titular aqui',
        type: 'text',
        autocomplete: 'name',
    },
    {
        id: 'last_name',
        label: 'Sobrenome',
        placeholder: 'Digite o sobrenome do titular aqui',
        type: 'text',
        autocomplete: 'last_name',
    },
    {
        id: 'email',
        label: 'Email',
        placeholder: 'Digite seu email aqui',
        type: 'email',
        autocomplete: 'email',
    },
    {
        id: 'cpf',
        label: 'CPF do titular',
        placeholder: 'xxx.xxx.xxx-xx',
        type: 'number',
        autocomplete: 'cpf',
    },
    {
        id: 'document',
        label: 'Número do documento',
        placeholder: 'xx.xxx.xxx.xxx.xx',
        type: 'number',
        autocomplete: 'document',
    },
]

const showPopup = ref(false)

const closePopup = () => {
    showPopup.value = false
}

const fieldsStep5 = [
    { id: 'name', name: 'Nome do titular', data: 'Fulano Ciclano Beutrano' },
    { id: 'card', name: 'Número do cartão', data: '000.000.000.0000' },
    { id: 'name', name: 'Nome do titular', data: 'Fulano Ciclano Beutrano' },
    { id: 'date', name: 'Data de validade (MM/AA)', data: '00/00' },
    { id: 'cvv', name: 'Código de segurança (CVV)', data: 'xxx' },
    { id: 'institution', name: 'Instituição beneficiária', data: 'Luz' },
]

const handleFinish = () => {
    showPopup.value = true
    // alert('Pagamento efetuado!')
}
</script>

<template>
    <h1 class="mb-10 hidden text-center text-2xl font-semibold lg:block">Doação</h1>
    <StepByStep :total-steps="5" finish-button-text="Doar" @finish="handleFinish">
        <template #step-1>
            <PaymentMethod :form-fields="payForms" />
        </template>

        <template #step-2>
            <BaseForm :form-fields="fieldsStep2" />
        </template>

        <template #step-3>
            <BaseForm :form-fields="fieldsStep3" />
        </template>

        <template #step-4> </template>

        <template #step-5>
            <PurchaseDetails :complete-fields="fieldsStep5" />
        </template>

        <template #finish-message>
            <QrCode
                :showPopup="showPopup"
                @close="closePopup"
                code="00020126520014BR.GOV.BCB.PIX0120A8f3Zr3P1xY6L0uN"
                time="90"
            />
            <h2 class="mb-4 text-xl font-semibold text-green-500">Concluído!</h2>
            <p class="text-gray-600 dark:text-gray-400">Doação paga com sucesso.</p>
        </template>
    </StepByStep>
</template>
