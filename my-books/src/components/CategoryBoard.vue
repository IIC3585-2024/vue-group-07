<template>
    <div class="board">
        <div class="row scroll-container">
            <div class="col" v-for="category in categories" :key="category.id">
                <h3>
                    <a class="col-title" @click="moveCategory(category)">
                        {{ category.name }}
                    </a>
                </h3>
                <BoardBookCard v-for="book in books[category.id]" :title="book.title" :authors="book.author_name" :cover-i="book.cover_i" :id="book.id" @click="moveToBook(book)"/>
            </div>
        </div>
    </div>
</template>

<style>

.board {
    background-color: transparent;
}

.row {
    display: flex;
    align-items: flex-start;
    padding: 10px;
    min-height: 70vh;
}

.col {
    display: flex;
    flex-direction: column;
    column-gap: 50px;
    border-radius: 8px;
    padding: 10px;
    margin: 0 1rem;
    width: 20rem;
    text-align: center;
    align-content: start;
    justify-items: center;
    background-color: #202020;
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
import BoardBookCard from './BoardBookCard.vue';
import { getBooksByCategory } from '@/lib/getBooksbyCategory';




export default {
    setup() {
        const store = useCurrentStore();
        const router = useRouter();
        const moveCategory = (category) => {
            store.setCurrentCategory(category);
            router.push({ name: 'gallery', params: { category: category.id } });
        }
        function moveToBook(book) {
            const currentStore = useCurrentStore();
            currentStore.setCurrentBook(book);
            router.push({ name: 'book' , params: { id: book.id } });
        }

        return {
            moveCategory,
            moveToBook
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