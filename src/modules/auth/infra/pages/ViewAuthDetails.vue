<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <div>
    <h1>Auth Detail View</h1>
    <p>Detail ID: {{ route.params.id }}</p>
  </div>
</template>

<style scoped lang="scss">

</style>
