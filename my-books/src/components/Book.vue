<script setup>

import { ref, reactive, computed, onMounted, watch } from 'vue';
import getBookDescription from '@/lib/getBookDescription';
import { useCurrentStore } from '@/stores/current';
import { useBooksStore } from '@/stores/db';
import { categories } from '../data/categories';
import { useRoute, useRouter } from 'vue-router';
import { moveBook, addBook, deleteBook } from '@/lib/postBook';

const book = reactive({
    title: '',
    author_name: [],
    cover_i: 0,
    key: '',
    first_publish_year: 0,
    number_of_pages_median: 0,
    ratings_average: 0,
    ratings_count: 0,
});

const filteredCategories = categories.filter((category) => category.name !== 'All books');

const props = defineProps({
    book: Object,
    closeFunction: Function,
});

const colorClasses = ["button-green", "button-blue", "button-yellow", "button-light-blue"]

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

            if (props.closeFunction) {
                props.closeFunction();
            }
            
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
        const bookId = useRoute().params.id;

        if (props.book) {
            Object.assign(book, props.book);
            mounted.value = true;
        } else if (bookId) {
            const booksStore = useBooksStore();
            booksStore.getBook(bookId)
                .then((DBbook) => {
                    console.log(book)
                    Object.assign(book, DBbook);
                    mounted.value = true;
                });
        }
        else if (currentBook) {
                Object.assign(book, currentBook);
                mounted.value = true;
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
            <button class="button" v-for="(category, index) in filteredCategories" :key="category.id" :class="colorClasses[index % colorClasses.length]" :value="category.id" @click="redirectWraper(moveBook)(book,category.id)"> {{ category.name }} </button>
            <button class="button button-red" @click="redirectDelete"> Delete </button>
        </div>
        <div class="button-row" v-else>
            <button class="button" v-for="(category, index) in filteredCategories" :key="category.id" :class="colorClasses[index % colorClasses.length]" :value="category.id" @click="redirectWraper(addBook)(book,category.id)"> {{ category.name }} </button>
        </div>
    </main>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
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

.button {
    margin-right: 5px;
}

</style>
