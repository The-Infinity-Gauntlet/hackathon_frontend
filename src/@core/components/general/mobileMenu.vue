<script setup lang="ts">
const menubar = [
  { icon: 'person', link: '/sig-in' },
  { icon: 'savings', link: '/sig-up' },
  { icon: 'home', link: '/' },
  { icon: 'distance', link: '/recuperacao' },
  { icon: 'apps', link: '/' },
]
</script>

<template>
  <nav class="backdrop-blur-xs bg-[#7AA6C8]/30 py-2 shadow-xl rounded-t-2xl w-full">
    <ul class="flex justify-around items-center text-[#0453AF]">
      <li v-for="item in menubar" :key="item.icon">
        <RouterLink :to="item.link">
          <span class="material-symbols-outlined">{{ item.icon }}</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
