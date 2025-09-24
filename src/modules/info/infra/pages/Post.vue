<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import posts from '/public/info/posts.json';

const route = useRoute();
const postId = Number(route.params.id);

const post = computed(() => posts.find(p => p.id === postId));
</script>

<template>
  <div v-if="post" class="grid gap-8 px-5 sm:px-10 md:px-15 lg:px-20 xl:px-25">
    <div class="grid gap-1 pt-8">
      <h2 class="text-2xl font-semibold">{{ post.title }}</h2>
      <p class="text-[#0453AF]">{{ post.author }}</p>
      <p class="text-[#999999]">{{ post.date }}</p>
    </div>

    <img :src="post.image" :alt="post.title"
      class="w-80 h-auto mx-auto rounded-2xl bg-[#999999] object-cover lg:w-180" />

    <div class="prose max-w-none" v-html="post.text"></div>
  </div>
  <div v-else class="text-center p-10 lg:text-lg">
    <p>Post não encontrado.</p>
  </div>
</template>
