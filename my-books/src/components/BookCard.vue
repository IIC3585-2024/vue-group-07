<script setup>
import { ref, computed } from 'vue';

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

<style>
.card {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    width: 18rem;
    height: 24rem;
    text-align: center;
}

.cover {
    /* max height of 260px */
    max-height: 16rem;
}

</style>