<!-- <script setup>
import { ref } from 'vue';
import BookCard from './BookCard.vue';

const books = ref([])
</script> -->

<script>
import { useCurrentStore } from '@/stores/current';
import { useRouter } from 'vue-router';
import axios from 'axios';
import BookCard from './BookCard.vue';
import { useBooksStore } from '@/stores/db';
import { getBooksByCategory } from '@/lib/getBooksbyCategory';



export default {
    setup() {
        const store = useCurrentStore();
        const booksStore = useBooksStore();
        const router = useRouter();
        const currentCategory = store.currentCategory;
        function moveToBook(book) {
            const currentStore = useCurrentStore();
            currentStore.setCurrentBook(book);
            router.push({ name: 'book' });
        }
        return {
            currentCategory,
            booksStore,
            moveToBook
        }
    },
    mounted() {
        getBooksByCategory(this.currentCategory)
            .then(books => {
                this.books = books;
            })
    },
    data() {
        return {
            books: []
        }
    },
    components: {
        BookCard
    }  
}

</script>

<template>
    <main>
        <h1> Gallery </h1>
        <!-- <h2> {{ currentCategory.name }} </h2> -->
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
    width: 100%;
}

.gallery {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin: 20px;
}
</style>