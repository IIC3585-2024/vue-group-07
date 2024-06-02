<script setup>
import CategoryBoard from '../components/CategoryBoard.vue';
</script>

<template>
    <div class="sticky">
        <h1>My Books 📚</h1>
        <p>Search for a book to add to your collection.</p>
        <router-link to="/add-book">Add book</router-link>
        <p>Select a category to view the books</p>
    </div>
    <div class="main">
        <CategoryBoard />
    </div>
</template>

<style scoped>
.main {
    margin: 0 8rem;
    padding: 2rem;
}
.sticky {
    position: sticky;
    left: 0;
    width: 100vw;
    padding: 2rem 10rem;
}
</style>