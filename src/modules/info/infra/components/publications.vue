<script setup lang="ts">
interface IPublications {
  id: string | number
  position: string | number
  title: string
  text: string
  author: string
  date: string
  image: string
  link: string
}

defineProps<{
  posts: IPublications[]
}>()
</script>

<template>
  <h2 class="py-5 font-semibold">Publicações</h2>

  <div class="lg:mx-auto">
    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-between">
      <li v-for="post in posts" :key="post.id" class="lg:w-[30vw]">
        <RouterLink :to="post.link"
          class="my-5 flex h-auto items-center justify-between gap-5 lg:gap-10 lg:block lg:px-5">
          <img :src="post.image" :alt="post.title"
            class="h-25 w-30 rounded-2xl bg-[#D9D9D9] object-cover sm:w-40 sm:h-30 lg:w-[80%] lg:h-full lg:mb-4" />
          <div class="grid justify-between gap-3">
            <p class="text-sm text-[#2768CA]">{{ post.title }}</p>
            <p class="text-xs">{{ post.text }}</p>
            <p class="text-xs font-semibold">
              Autor: <span class="font-normal text-[#999999]">{{ post.author }}</span>
            </p>
          </div>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
