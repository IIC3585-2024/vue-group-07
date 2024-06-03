<script setup>
import { categories } from '../data/categories';
import CategoryBoard from '../components/CategoryBoard.vue';
import AddBook from '../components/AddBook.vue';
</script>

<template>
    <div id="book-search">
        <AddBook />
    </div>
</template>

<style scoped>

#book-search {
    margin: 0 8rem;
    padding: 2rem;
    min-width: 80vw;
    min-height: 100vh;
}

</style>