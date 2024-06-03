<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <header>
    <NavBar />
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>

header {
  line-height: 1.5;
  max-height: 100vh;
}

main {
  margin-top: 100px;
}

</style>
