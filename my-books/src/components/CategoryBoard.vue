<template>
    <div class="board">
        <div class="row scroll-container">
            <div class="col" v-for="category in categories" :key="category.id">
                <a @click="moveCategory(category)">
                    {{ category.name }}
                </a>
                <BookCard v-for="book in books" :title="book.title" :authors="book.author_name" :cover-i="book.cover_i"/>
            </div>
        </div>
    </div>
</template>

<style>

.board {
    border: 2px solid gray;
    border-radius: 3px;
}

.row {
    display: flex;
    padding: 10px;
    min-height: 70vh;
}

.col {
    display: grid;
    column-gap: 50px;
    border: 2px solid gray;
    border-radius: 3px;
    padding: 10px;
    margin: 0 5px;
    min-width: 300px;
    text-align: center;
}

.scroll-container {
    width: 100%;
    overflow-x: auto;
    white-space: nowrap;
}
</style>

<script>
import { categories } from '../data/categories';
import { useCurrentStore } from '@/stores/current';

import { useRouter } from 'vue-router';

import axios from 'axios';
import BookCard from './BookCard.vue';




export default {
    setup() {
        const store = useCurrentStore();
        const router = useRouter();
        const moveCategory = (category) => {
            store.setCurrentCategory(category);
            router.push({ name: 'gallery' });
        }

        return {
            moveCategory
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
            categories: categories,
            books: []
        }
    },
    components: {
        BookCard
    }
}
</script>