<script setup>
import { useCurrentStore } from '@/stores/current';
import { useRouter, useRoute } from 'vue-router';
import BookCard from './BookCard.vue';
import { getBooksByCategory } from '@/lib/getBooksbyCategory';
import { categories } from '../data/categories';
import { ref, onMounted } from 'vue';

const store = useCurrentStore();
const router = useRouter();
const currentCategory = store.currentCategory;
const books = ref([]);


if (useRoute().params.category === undefined) {
    router.push({ name: 'home' });
} else {
    store.setCurrentCategory(categories.find(category => category.id === useRoute().params.category));
}

function moveToBook(book) {
    const currentStore = useCurrentStore();
    currentStore.setCurrentBook(book);
    router.push({ name: 'book' , params: { id: book.id } });
}

onMounted(() => {
    getBooksByCategory(currentCategory)
        .then(booksReponse => {
            books.value = booksReponse;
        })
})

</script>

<template>
    <main>
        <h1> {{ currentCategory.name }} </h1>
        <div class="gallery">
            <BookCard v-for="book in books" :title="book.title" :authors="book.author_name" :cover-i="book.cover_i" @click="moveToBook(book)"/>
        </div>
    </main>
</template>

<style>
main {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 70vw;
    height: 90vh;
    width: 100%;
}

.gallery {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    margin: 20px;
}
</style>