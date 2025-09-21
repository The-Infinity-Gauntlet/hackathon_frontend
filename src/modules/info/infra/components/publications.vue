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
    <ul>
        <li v-for="post in posts" :key="post.id">
            <RouterLink
                :to="post.link"
                class="my-5 flex h-auto items-center justify-start gap-5 lg:gap-10"
            >
                <img
                    :src="post.image"
                    :alt="post.title"
                    class="h-full w-30 rounded-2xl bg-[#D9D9D9] object-cover"
                />
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
</template>
