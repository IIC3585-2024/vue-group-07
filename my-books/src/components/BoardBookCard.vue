<script setup>
import { ref, computed } from 'vue';
import { useBooksStore } from '@/stores/db';
import { useRouter } from 'vue-router';

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

const router = useRouter();
const deleteBook = () => {
    booksStore.deleteBook(props.id);
    // refresh the page
    router.go();
}

</script>

<template>
    <div class="card">
        <img :src="coverURL" alt="book" class="cover"/>
        <h2>{{ title }}</h2>
        <p>{{ authorsString }}</p>
        <div>
            <button @click="deleteBook" class="button button-red"> Delete </button>
        </div>
    </div>
</template>

<style scoped>
.card {
    border: 1px solid black;
    background-color: hsla(160, 100%, 37%, 1);
    border-radius: 5px;
    width: 90%;
    margin: 5%;
    padding: 10px;
    text-align: center;
    color: #fff;
    text-wrap: wrap;
    height: auto;
    line-height: 1.3;
}

.cover {
    width: 100%;
    height: 16rem;
    object-fit: cover;
}

</style>