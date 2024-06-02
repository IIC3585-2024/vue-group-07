<script setup>
import { ref, computed } from 'vue';
import { useBooksStore } from '@/stores/db';

const props = defineProps({
    id: Number,
    title: String,
    authors: Array,
    coverI: Number
});

const authorsString = computed(() => {
    return props.authors.join(', ').trimEnd();
});

const coverURL = computed(() => {
    return `http://covers.openlibrary.org/b/id/${props.coverI}-M.jpg`;
});

const booksStore = useBooksStore();

const deleteBook = () => {
    booksStore.deleteBook(props.id);
}

</script>

<template>
    <div class="card">
        <img :src="coverURL" alt="book" class="cover"/>
        <h2>{{ title }}</h2>
        <p>{{ authorsString }}</p>
        <div>
            <button @click="deleteBook"> Delete </button>
        </div>
    </div>
</template>

<style>
.card {
    border: 1px solid #ccc;
    background-color: hsla(160, 100%, 37%, 1);
    border-radius: 5px;
    width: 80%;
    height: 24rem;
    text-align: center;
}

.cover {
    /* max height of 260px */
    max-height: 16rem;
}

</style>