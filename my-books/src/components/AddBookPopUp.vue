<script setup>
import BookCard from './BookCard.vue';
import { categories } from '../data/categories';
import { ref } from 'vue';
import { useBooksStore } from '@/stores/db';
import { useRouter } from 'vue-router';

const store = useBooksStore();
const router = useRouter();
const props = defineProps({
    book: Object
});

const selectedCategory = ref(null);
const addBookDB = () => {
    const bookJson = JSON.parse(JSON.stringify(props.book));
    bookJson.category = selectedCategory.value;

    store.addBook(bookJson);
    
    router.push({ name: 'home' });
}

</script>

<template>
    <div>
        <h2> Do you want to add the following book to a category? </h2>
        <BookCard :title="book.title" :authors="book.author_name" :cover-i="book.cover_i"/>
        <h3> Select a category </h3>
        <select v-model="selectedCategory">
            <option v-for="category in categories" :key="category.id" :value="category.id"> {{ category.name }} </option>
        </select>
        <button @click="addBookDB()"> Add Book </button>
    </div>
</template>

<script>


export default {
    data() {
        return {
            categories: categories,
        }
    }
}
</script>