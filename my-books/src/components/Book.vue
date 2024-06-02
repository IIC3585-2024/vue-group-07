<script setup>

import { ref, reactive, computed, onMounted, watch } from 'vue';
import getBooksByTitle from '@/lib/getBooksByTitle';
import getBookDescription from '@/lib/getBookDescription';
import { getBook } from '@/db/IndexedDB';
import { useCurrentStore } from '@/stores/current';
import { categories } from '../data/categories';
import { useRoute, useRouter } from 'vue-router';
import { moveBook, addBook, deleteBook } from '@/lib/postBook';

const book = reactive({
    title: '',
    author_name: [],
    cover_i: 0,
    key: '',
});

const props = defineProps({
    book: Object
});

const description = ref('');
const mounted = ref(false);

const coverURL = computed(() => `http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`);

const authorsString = computed(() => {
    return book.author_name.join(', ').trimEnd();
});

const isBook = computed(() => useRoute().name === 'book');

watch(book, async (newBook) => {
    try {
        description.value = await getBookDescription(newBook.key);
    } catch (error) {
        console.error(error);
    }
});

const router = useRouter();

function redirectWraper(func) {
    return (book, category) => {
        try {
            func(book, category);
            
            router.push({ name: 'home' });
        } catch (error) {
            console.error(error);
        }
    }
}

function redirectDelete() {
    try {
        deleteBook(book.id);
        router.push({ name: 'home' });
    } catch (error) {
        console.error(error);
    }
}


onMounted(() => {
    try {
        const currentStore = useCurrentStore();
        const currentBook = currentStore.currentBook;
        if (props.book) {
            Object.assign(book, props.book);
            mounted.value = true;
        }
        else {
            if (currentBook) {
                Object.assign(book, currentBook);
                mounted.value = true;
            }
        }
    } catch (error) {
        console.error(error);
    }
});

</script>

<template>
    <main>
        <div class="container">
        <img v-if="mounted" :src="coverURL" alt="book" class="cover"/>
        <div v-if="mounted">
            <h1>{{ book.title }}</h1>
            <h2>by {{ authorsString }}</h2>
            <p class="publish-year">Published in {{ book.first_publish_year }}</p>
            <p>{{ book.number_of_pages_median }} Pages</p>
            <ul class="ratings">
                <li class="rating-avg">
                    <span v-for="n in Math.floor(book.ratings_average)" class="star">★</span>
                    <span class="average">{{ book.ratings_average.toFixed(2) }}</span>
                </li>
                <li>-</li>
                <li>{{ book.ratings_count }} Ratings</li>
            </ul>
            <p class="description">{{ description }}</p>
        </div>
        </div>
        <div class="button-row" v-if="isBook">
            <button v-for="category in categories" :key="category.id" :value="category.id" @click="redirectWraper(moveBook)(book,category.id)"> {{ category.name }} </button>
            <button @click="redirectDelete"> Delete </button>
        </div>
        <div class="button-row" v-else>
            <button v-for="category in categories" :key="category.id" :value="category.id" @click="redirectWraper(addBook)(book,category.id)"> {{ category.name }} </button>
        </div>
    </main>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
    flex: 1;
}

h1 {
    font-weight: bold;
}

.cover {
    width: 16rem;
    height: auto;
    max-height: 25rem;
    margin-right: 3rem;
    margin-top: 0.9rem;
}

.publish-year {
    margin-top: 0.5rem;
}

.ratings {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    align-items: end;
    gap: 0.3rem;
}

.rating-avg {
    display: flex;
    flex-direction: row;
    align-items: end;
}

.star {
    font-size: 1.2em;
}

.average {
    margin-left: 0.3rem;
}

.description {
    margin-top: 2rem;
    font-size: 1.1em;
    line-height: 1.5em;
}

</style>
