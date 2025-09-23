<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { BaseForm } from '@/@core/components'
import { loadMercadoPago } from '@mercadopago/sdk-js'
import type { IFormField } from '@/@core/interfaces/form'
import { usePixPayment } from '../../controllers/PaymentController'

onMounted(async () => {
    await loadMercadoPago()
})

const fieldsPix: IFormField[] = [
    {
        id: 'form-checkout__payerFirstName',
        name: 'payerFirstName',
        label: 'Nome do titular',
        placeholder: 'Digite o nome do titular aqui',
        type: 'text',
        autocomplete: 'name',
    },
    {
        id: 'form-checkout__payerLastName',
        name: 'payerLastName',
        label: 'Sobrenome',
        placeholder: 'Digite o sobrenome do titular aqui',
        type: 'text',
        autocomplete: 'last_name',
    },
    {
        id: 'form-checkout__email',
        name: 'email',
        label: 'Email',
        placeholder: 'Digite seu email aqui',
        type: 'email',
        autocomplete: 'email',
    },
    {
        id: 'form-checkout__identificationType',
        name: 'identificationType',
        label: 'Tipo de documento',
        placeholder: 'Informe o tipo de documento',
        type: 'text',
        autocomplete: 'cpf',
    },
    {
        id: 'form-checkout__identificationNumber',
        name: 'identificationNumber',
        label: 'Número do documento',
        placeholder: 'xxx.xxx.xxx.xx',
        type: 'number',
        autocomplete: 'document',
    },
    {
        id: 'transactionAmount',
        name: 'transactionAmount',
        label: 'Valor',
        placeholder: 'R$ x.xxx, xx',
        type: 'number',
        autocomplete: 'document',
    },
]

const pixStore = usePixPayment()
const showPopup = ref(false)
const qrCode = ref('')

async function handlePixPayment(values: Record<string, any>) {
    console.log("Valores: ", values)
    try {
        const amount = parseFloat(values["transactionAmount"].replace(',', '.'))
        const response = await pixStore.createPaymentPix({
            payment_method_id: 'pix',
            first_name: values["form-checkout__payerFirstName"],
            last_name: values["form-checkout__payerLastName"],
            payer: {
                email: values["form-checkout__email"],
                identification: {
                    type: values["form-checkout__identificationType"],
                    number: values["form-checkout__identificationNumber"]
                }
            },
            transaction_amount: amount
        })
        qrCode.value = response.point_of_interaction.transaction_data.qr_code
        showPopup.value = true
        alert("Pagamento enviado com sucesso!")
    } catch (error) {
        console.error('Erro ao criar pagamento Pix:', error)
        alert('Ocorreu um erro ao processar o pagamento. Tente novamente.')
    }
}

const closePopup = () => {
    showPopup.value = false
}
</script>

<template>
    <BaseForm :form-fields="fieldsPix" buttonText="Pagar com Pix" @submit="handlePixPayment" />
    <QrCode v-if="showPopup" :showPopup="showPopup" @close="closePopup" :code="qrCode" time="90" />
</template>
