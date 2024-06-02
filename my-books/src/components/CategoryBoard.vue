<template>
    <div class="board">
        <div class="row scroll-container">
            <div class="col" v-for="category in categories" :key="category.id">
                <h3>
                    <a class="col-title" @click="moveCategory(category)">
                        {{ category.name }}
                    </a>
                </h3>
                <BoardBookCard v-for="book in books[category.id]" :title="book.title" :authors="book.author_name" :cover-i="book.cover_i" :id="book.id"/>
            </div>
        </div>
    </div>
</template>

<style>

.board {
    border: 2px solid black;
    border-radius: 3px;
    background-color: rgb(0, 86, 57);
}

.row {
    display: flex;
    padding: 10px;
    min-height: 70vh;
}

.col {
    display: flex;
    flex-direction: column;
    column-gap: 50px;
    border: 2px solid black;
    border-radius: 3px;
    padding: 10px;
    margin: 0 5px;
    min-width: 300px;
    text-align: center;
    align-content: start;
    justify-items: center;
    background-color: #181818;
}

.scroll-container {
    width: 100%;
    overflow-x: auto;
    white-space: nowrap;
}

.col-title:hover {
    cursor: pointer;
}
</style>

<script>
import { categories } from '../data/categories';
import { useCurrentStore } from '@/stores/current';

import { useRouter } from 'vue-router';

import axios from 'axios';
import BoardBookCard from './BoardBookCard.vue';
import { getBooksByCategory } from '@/lib/getBooksbyCategory';




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
            // get books from each category and set them to the books data
            for (let category of categories) {
                getBooksByCategory(category).then((books) => {
                    this.books[category.id] = books;
                });
            }
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
        BoardBookCard
    }
}
</script>