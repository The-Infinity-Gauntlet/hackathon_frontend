<script setup lang="ts">
import { ProfileForm } from '../components'

const fields = [
  {
    id: 'name',
    label: 'Atualizar nome',
    fields: [
      {
        placeholder: 'Digite seu nome aqui',
        type: 'text',
        autocomplete: 'name',
      },
      {
        placeholder: 'Digite seu sobrenome aqui',
        type: 'text',
        autocomplete: 'name',
      },
    ],
    buttonText: 'Atualizar nome',
  },
  {
    id: 'email',
    label: 'Atualizar email',
    message: 'E-mail atual: qwertyzxc@gmail.com',
    placeholder: 'Digite seu email aqui',
    type: 'email',
    autocomplete: 'email',
    buttonText: 'Atualizar e-mail',
  },
  {
    id: 'dateborn',
    label: 'Atualizar data de nascimento',
    type: 'date',
    name: 'Mês',
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
    buttonText: 'Atualizar data',
  },
  {
    id: 'password',
    label: 'Atualizar senha',
    fields: [
      {
        label: 'Senha atual',
        placeholder: 'Digite sua senha atual aqui',
        type: 'password',
        autocomplete: 'new-password',
      },
      {
        id: 'new-password',
        label: 'Nova senha',
        placeholder: 'Digite sua nova senha aqui',
        type: 'password',
        autocomplete: 'new-password',
      },
      {
        id: 'password-confirm',
        label: 'Confirme a sua senha',
        placeholder: 'Confirme a sua senha aqui',
        type: 'password',
        autocomplete: 'new-password',
      },
    ],
    buttonText: 'Atualizar senha',
  },
  {
    id: 'delete',
    label: 'Excluir conta',
    placeholder: 'Digite sua senha aqui',
    type: 'password',
    autocomplete: 'new-password',
    buttonText: 'Excluir conta',
  },
]
</script>

<template>
  <div class="grid justify-center px-5 pb-20">
    <ProfileForm
      v-for="field in fields"
      :key="field.id"
      :form-fields="[field]"
      :buttonText="field.buttonText"
    />
  </div>
</template>
