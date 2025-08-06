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
  <nav class="w-full rounded-t-2xl bg-[#7AA6C8]/30 py-2 shadow-xl backdrop-blur-xs">
    <ul class="flex items-center justify-around text-[#0453AF]">
      <li v-for="item in menubar" :key="item.icon">
        <RouterLink :to="item.link">
          <span class="material-symbols-outlined">{{ item.icon }}</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
