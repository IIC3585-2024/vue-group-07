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

export default {
    setup() {
        const store = useCurrentStore();
        const router = useRouter();
        const currentCategory = store.currentCategory;
        return {
            currentCategory
        }
    },
    mounted() {
        try {
            // get books from the API and set them to the books data , get first 10 books
            axios.get('http://openlibrary.org/search.json?title=the+lord+of+the+rings&page=1&limit=10')
                .then(response => {
                    const books = response.data.docs;
                    this.books = books.filter(book => 'author_name' in book && 'title' in book && 'cover_i' in book);
                    console.log(this.books)
                });
        } catch (error) {
            console.error(error);
        }
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
            <BookCard v-for="book in books" :title="book.title" :authors="book.author_name" :cover-i="book.cover_i"/>
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