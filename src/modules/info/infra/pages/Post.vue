<script setup lang="ts">
const post = {
  id: 0,
  position: 1,
  title: 'Por que Joinville alaga?',
  text: 'As enchentes são eventos naturais que acontecem quando o volume de água.',
  author: 'Fulano',
  date: '31/07/2025 19:15',
  image: '/logo.svg',
  link: '/blog',
}
</script>

<template>
  <div class="grid justify-center gap-8 px-5 pb-20">
    <div class="grid gap-1 pt-8">
      <h2 class="text-2xl font-semibold">{{ post.title }}</h2>
      <p class="text-[#0453AF]">{{ post.author }}</p>
      <p class="text-[#999999]">{{ post.date }}</p>
    </div>

    <img :src="post.image" :alt="post.title" class="w-full rounded-2xl bg-[#999999] object-cover" />

    <p>{{ post.text }}</p>
  </div>
</template>
