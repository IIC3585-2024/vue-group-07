<script setup>

import { ref, reactive, computed, onMounted, watch } from 'vue';
import getBooksByTitle from '@/lib/getBooksByTitle';
import getBookDescription from '@/lib/getBookDescription';
import { getBook } from '@/db/IndexedDB';

const book = reactive({
    title: '',
    author_name: [],
    cover_i: 0,
    key: '',
});

const description = ref('');
const mounted = ref(false);

const coverURL = computed(() => `http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`);

const authorsString = computed(() => {
    return book.author_name.join(', ').trimEnd();
});

watch(book, async (newBook) => {
    try {
        description.value = await getBookDescription(newBook.key);
    } catch (error) {
        console.error(error);
    }
});


onMounted(() => {
    try {
        getBooksByTitle('the lord of the rings').then(books => {
            Object.assign(book, books[1]);
            mounted.value = true;
        });
    } catch (error) {
        console.error(error);
    }
});

</script>

<template>
    <div>
        <img v-if="mounted" :src="coverURL" alt="book" class="cover"/>
        <h2>{{ book.title }}</h2>
        <p>by {{ authorsString }}</p>
        <p>{{ book.first_publish_year }}</p>
        <p>{{ book.ratings_average }} - {{ book.ratings_count }} ratings</p>
        <p>Pages: {{ book.number_of_pages_median }}</p>
        <p>{{ description }}</p>
    </div>
</template>