<script setup>

import { ref, onMounted, computed } from 'vue';
import getBooksByTitle from '@/lib/getBooksByTitle';

const books = ref([]);
const book = ref({
    title: '',
    author_name: [],
    cover_i: 0
});

const coverURL = computed(() => {
    return `http://covers.openlibrary.org/b/id/${book.value.cover_i}-L.jpg`;
});

const authorsString = computed(() => {
    return book.value.author_name.join(', ').trimEnd();
});

onMounted(() => {
    try {
        getBooksByTitle('the lord of the rings').then(books => {
            books.value = books;
            book.value = books[0];
        })
    } catch (error) {
        console.error(error);
    }
});

</script>
<template>
    <div>
        <img :src="coverURL" alt="book" class="cover"/>
        <h2>{{ book.title }}</h2>
        <p>by {{ authorsString }}</p>
        <p>{{ book.first_publish_year }}</p>
        <p>{{ book.ratings_average }} - {{ book.ratings_count }} ratings</p>
        <p>Pages: {{ book.number_of_pages_median }}</p>
    </div>
</template>