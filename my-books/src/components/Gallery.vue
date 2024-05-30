<script setup>
import { ref } from 'vue';
import BookCard from './BookCard.vue';

const books = ref([])
</script>

<template>
    <div>
        <h2> Gallery </h2>
        <BookCard v-for="book in books" :id="book.id" :title="book.title" :author="book.author"/>
    </div>
</template>