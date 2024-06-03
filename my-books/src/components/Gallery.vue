<script>
import { useCurrentStore } from '@/stores/current';
import { useRouter, useRoute } from 'vue-router';
import BookCard from './BookCard.vue';
import { useBooksStore } from '@/stores/db';
import { getBooksByCategory } from '@/lib/getBooksbyCategory';
import { categories } from '../data/categories';

export default {
    setup() {
        const store = useCurrentStore();
        const booksStore = useBooksStore();
        const router = useRouter();

        if (useRoute().params.category === undefined) {
            router.push({ name: 'home' });
        } else {
            store.setCurrentCategory(categories.find(category => category.id === useRoute().params.category));
        }

        const currentCategory = store.currentCategory;

        function moveToBook(book) {
            const currentStore = useCurrentStore();
            currentStore.setCurrentBook(book);
            router.push({ name: 'book' , params: { id: book.id } });
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