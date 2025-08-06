<script setup lang="ts">
import stepByStep from '@/@core/components/steps/stepByStep.vue'
import paymentMethod from '../components/paymentMethod.vue'
import baseForm from '@/@core/components/forms/baseForm.vue'
import purchaseDetails from '../components/purchaseDetails.vue'
import type { IFormField } from '@/@core/interfaces/form'

const payForms = [
  { icon: '/payment/card.svg', name: 'Cartão' },
  { icon: '/payment/pix.svg', name: 'Pix' },
  { icon: '/payment/bank_slip.svg', name: 'Boleto' },
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

const fieldsStep4 = [
  { id: 'name', name: 'Nome do titular', data: 'Fulano Ciclano Beutrano' },
  { id: 'card', name: 'Número do cartão', data: '000.000.000.0000' },
  { id: 'name', name: 'Nome do titular', data: 'Fulano Ciclano Beutrano' },
  { id: 'date', name: 'Data de validade (MM/AA)', data: '00/00' },
  { id: 'cvv', name: 'Código de segurança (CVV)', data: 'xxx' },
  { id: 'institution', name: 'Instituição beneficiária', data: 'Luz' },
]

const handleFinish = () => {
  alert('Pagamento efetuado!')
}
</script>

<template>
  <stepByStep :total-steps="4" finish-button-text="Doar" @finish="handleFinish">
    <template #step-1>
      <paymentMethod :form-fields="payForms" />
    </template>

    <template #step-2>
      <baseForm :form-fields="fieldsStep2" />
    </template>

    <template #step-3> </template>

    <template #step-4>
      <purchaseDetails :complete-fields="fieldsStep4" />
    </template>

    <template #finish-message>
      <h2 class="text-xl font-semibold mb-4 text-green-500">Concluído!</h2>
      <p class="text-gray-600 dark:text-gray-400">Doação paga com sucesso.</p>
    </template>
  </stepByStep>
</template>
