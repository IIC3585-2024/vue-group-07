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
    <div class="popup">
        <div class="popup-inner">
            <h2> Do you want to add the following book to a category? </h2>
            <BookCard :title="book.title" :authors="book.author_name" :cover-i="book.cover_i"/>
            <h3> Select a category </h3>
            <select v-model="selectedCategory">
                <option v-for="category in categories" :key="category.id" :value="category.id"> {{ category.name }} </option>
            </select>
            <button @click="addBookDB()"> Add Book </button>
        </div>
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

<style scoped>

.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 99;

    display: flex;
    align-items: center;
    justify-content: center;

    .popup-inner {
        background: #181818;
        padding: 20px;
        border-radius: 5px;
        align-items: center;
        justify-content: center;
        display: flex;
        flex-direction: column;
    }

}


</style>