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

const handleDeleteClick = (event) => {
    event.stopPropagation();
    deleteBook();
}

</script>

<template>
    <div class="card">
        <img :src="coverURL" alt="book" class="cover"/>
        <h2>{{ title }}</h2>
        <p>{{ authorsString }}</p>
        <div>
            <button @click="handleDeleteClick" class="button button-red"> Delete </button>
        </div>
    </div>
</template>

<style scoped>
.card {
    background-color: #2f2f2f;
    border-radius: 5px;
    margin: 5%;
    padding: 10px;
    text-align: center;
    color: #fff;
    text-wrap: wrap;
    height: auto;
    line-height: 1.3;

    img {
        border-radius: 4px;
    }
}

.card:hover {
    cursor: pointer;
}

.cover {
    width: 100%;
    height: 16rem;
    object-fit: cover;
}

</style>