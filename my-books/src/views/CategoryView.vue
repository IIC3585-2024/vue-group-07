<script setup>
import CategoryBoard from '../components/CategoryBoard.vue';
import AddBook from '../components/AddBook.vue';

</script>

<template>
    <div>
        <h1>My Books</h1>
        <p>Search for a book to add to your collection.</p>
        <router-link to="/add-book">Add book</router-link>
        <p>Select a category to view the books</p>
        <CategoryBoard />
    </div>
</template>