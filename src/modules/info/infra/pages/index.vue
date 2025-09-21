<script setup lang="ts">
import { Publications } from '../components'

const posts = [
  {
    id: 0,
    position: 1,
    title: 'Por que Joinville alaga?',
    text: 'As enchentes são eventos naturais que acontecem quando o volume de água.',
    author: 'Fulano',
    date: '31/07/2025 19:15',
    image: '../logo.svg',
    link: '/post',
  },
  {
    id: 1,
    position: 2,
    title: 'Por que Joinville alaga?',
    text: 'As enchentes são eventos naturais que acontecem quando o volume de água.',
    author: 'Fulano',
    date: '31/07/2025 19:15',
    image: '../logo.svg',
    link: '/post',
  },
  {
    id: 2,
    position: 3,
    title: 'Por que Joinville alaga?',
    text: 'As enchentes são eventos naturais que acontecem quando o volume de água.',
    author: 'Fulano',
    date: '31/07/2025 19:15',
    image: '../logo.svg',
    link: '/post',
  },
  {
    id: 3,
    position: 4,
    title: 'Por que Joinville alaga?',
    text: 'As enchentes são eventos naturais que acontecem quando o volume de água.',
    author: 'Fulano',
    date: '31/07/2025 19:15',
    image: '../logo.svg',
    link: '/post',
  },
  {
    id: 4,
    position: 5,
    title: 'Por que Joinville alaga?',
    text: 'As enchentes são eventos naturais que acontecem quando o volume de água.',
    author: 'Fulano',
    date: '31/07/2025 19:15',
    image: '../logo.svg',
    link: '/post',
  },
]
</script>

<template>
  <div class="grid justify-center px-5 pb-20">
    <section class="p-5">
      <h1 class="grid gap-3 text-4xl font-semibold lg:text-6xl">
        Blog <span class="text-[#2768CA]">Informativo</span>
      </h1>
      <p class="w-[90%] py-5 text-sm text-[#999999]">
        Causas, consequências, histórias e soluções num só lugar. Entenda, acompanhe as informações
        sobre enchentes e o impacto das chuvas em
        <span class="text-black dark:text-white">Joinville</span>.
      </p>
    </section>

    <hr class="color-black dark:color-white" />

    <section class="px-3 py-5">
      <h2 class="py-5 font-semibold">Publicações mais acessadas</h2>
      <ul>
        <li v-for="post in posts" :key="post.id" class="my-4">
          <p class="flex items-center gap-5 font-semibold">
            <span class="h-8 w-8 rounded-full bg-[#D9D9D9] pt-1 text-center text-black">{{
              post.position
            }}</span>
            {{ post.title }}
          </p>
        </li>
      </ul>

      <Publications :posts="posts" />
    </section>
  </div>
</template>
