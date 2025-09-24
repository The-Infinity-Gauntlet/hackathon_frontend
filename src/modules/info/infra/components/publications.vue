<script setup lang="ts">
interface IPublications {
  id: string | number
  position: string | number
  title: string
  preview: string
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
  <h2 class="py-5 font-semibold lg:text-xl">Publicações</h2>

  <div class="lg:mx-auto">
    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-between">
      <li v-for="post in posts" :key="post.id" class="lg:w-[30vw]">
        <RouterLink :to="post.link" class="my-5 flex h-auto items-center justify-between gap-5 lg:block lg:px-5">
          <div class="lg:w-[80%] mx-auto flex items-center gap-3 lg:block lg:items-start">
            <img :src="post.image" :alt="post.title"
              class="h-74 w-26 sm:w-40 sm:h-30 rounded-2xl bg-[#D9D9D9] object-cover lg:w-full lg:h-full lg:mb-4" />
            <div class="grid justify-between gap-3 mt-2">
              <p class="text-ms text-[#2768CA] break-words lg:text-lg">{{ post.title }}</p>
              <p class="text-sm break-words lg:text-base">{{ post.preview }}</p>
              <p class="text-sm font-semibold lg:text-base">
                Autor: <span class="font-normal text-[#999999]">{{ post.author }}</span>
              </p>
            </div>
          </div>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>


