<script setup>
import { categories } from '../data/categories';
import CategoryList from '../components/CategoryList.vue';
import AddBook from '../components/AddBook.vue';
</script>

<template>
    <div>
        <h1>My Books</h1>
        <p>Select a category to view the books</p>
        <CategoryList />
        <AddBook />
    </div>
</template>