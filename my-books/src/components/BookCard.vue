<script setup>
import { computed } from 'vue';

const props = defineProps({
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

</script>

<template>
    <div class="card">
        <img :src="coverURL" alt="book" class="cover"/>
        <h2>{{ title }}</h2>
        <p>{{ authorsString }}</p>
    </div>
</template>

<style scoped >
.card {
    background-color: #2f2f2f;
    border-radius: 5px;
    color: #fff;
    padding: 10px;
    margin: 10px;
    width: 18rem;
    text-align: center;
    text-wrap: wrap;
    height: auto;
}

.card:hover {
    cursor: pointer;
}

.cover {
    /* max height of 260px */
    width: 100%;
    height: 16rem;
    object-fit: cover;
}

</style>