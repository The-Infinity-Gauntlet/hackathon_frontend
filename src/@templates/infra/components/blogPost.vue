<script setup lang="ts">
const posts = [
  {
    id: 0,
    title: 'Ajude quem precisa!',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime, nam illo! Expedita corrupti sunt repellat error, sapiente excepturi!',
    icon: '/icons/who_helps.svg',
    link: '/pagamento',
    btnMessage: 'Doar',
  },
  {
    id: 1,
    title: 'Fique informado!',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime, nam illo! Expedita corrupti sunt repellat error, sapiente excepturi!',
    icon: '/icons/document.svg',
    link: '/blog',
    btnMessage: 'Saiba mais',
  },
]
</script>

<template>
  <section class="mt-10 mb-30 flex justify-center gap-5">
    <div
      v-for="post in posts"
      :key="post.id"
      class="grid justify-between gap-3 rounded-2xl bg-[#E5E5E5] p-5 dark:bg-[#00182F]"
    >
      <h3 class="text-center text-lg font-semibold">{{ post.title }}</h3>
      <p class="text-xs text-[#999999]">{{ post.description }}</p>
      <img :src="post.icon" :alt="post.title" class="mx-auto" />
      <RouterLink
        :to="post.link"
        class="rounded-2xl bg-[#2768CA] py-1.5 text-center font-semibold text-white"
        >{{ post.btnMessage }}</RouterLink
      >
    </div>
  </section>
</template>
