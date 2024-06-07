<script setup>
import { categories } from '../data/categories';
import { useSearchBookStore } from '@/stores/searchBooks';
import { ref } from 'vue';
import BookCard from './BookCard.vue';
import AddBookPopUp from './AddBookPopUp.vue';
import getBooksByParam from '@/lib/getBooksByParam';

const text = ref('');
const field = ref('q');
const found = ref(true);
const books = ref([]);
const showAddBookPopUp = ref(false);
const selectedBook = ref(null);


// TODO: Mover función a un archivo de utilidades
function searchBook() {
    let searchQuery = '';
    let searchParam = 'q';
    if (field.value === 'title') {
        searchParam = 'title';
    } else if (field.value === 'author') {
        searchParam = 'author';
    }
    
    if (text.value) {
        searchQuery = text.value;
    }

    getBooksByParam(searchQuery, searchParam)
        .then((booksResponse) => {
            books.value = booksResponse;
            if (books.length === 0) {
                found.value = false;
            } else {
                found.value = true;
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

function addBook(book) {
    selectedBook.value = {
        key: book.key,
        title: book.title,
        author_name: book.author_name,
        first_publish_year: book.first_publish_year,
        cover_i: book.cover_i,
        ratings_average: book.ratings_average,
        ratings_count: book.ratings_count,
        number_of_pages_median: book.number_of_pages_median,
    }
    showAddBookPopUp.value = true;
}

</script>

<template>
    <div>
        <h2 id="search-title"> Search Book </h2>
        <div class="search">
            <input class="text-search" type="text" placeholder="The Lord of the Rings" v-model="text" />
            <select class="search-by" v-model="field">
                <option value = "q"> All </option>
                <option value = "title"> Title </option>
                <option value = "author"> Author </option>
            </select>
            <button class="search-submit" @click="searchBook()"> Search </button>
        </div>
        <div class="results-container">
            <div class="gallery">
                <BookCard v-for = "book in books" :title = "book.title" :authors = "book.author_name" :cover-i = "book.cover_i" @click = "addBook(book)"/>
            </div>
        </div>
        <div class="waring-message" v-if="!found">
            <h3> No books found </h3>
        </div>
    </div>

    <AddBookPopUp v-if="showAddBookPopUp" :book="selectedBook" :close-function="() => showAddBookPopUp = false"/>
</template>

<style scoped>

#search-title {
    margin-top: 0.5rem;
}

.search {
    height: 3rem;
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    margin-bottom: 1.5rem;

    .text-search {
        font-size: 1.2em;
        background-color: #2f2f2f;
        appearance: none;
        border: 0;
        border-radius: 4px;
        padding: 0.5rem;
        color: rgba(235, 235, 235, .6);
    }

    .text-search:focus {
        outline: solid;
        outline-color: hsla(160, 100%, 37%, 1);
    }

    .search-by {
        font-size: 1.2em;
        background-color: #2f2f2f;
        appearance: none;
        border: 0;
        border-radius: 4px;
        padding: 0.5rem;
        color: rgba(235, 235, 235, .6);
    }

    .search-by:focus {
        outline: solid;
        outline-color: hsla(160, 100%, 37%, 1);
    }

    .search-submit {
        font-size: 1.2em;
        font-weight: semibold;
        background-color: hsla(160, 100%, 37%, 1);
        appearance: none;
        border: 0;
        border-radius: 4px;
        padding: 0.5rem;
        color: rgba(255, 255, 255, .9);
    }

    .search-submit:hover {
        background-color: hsla(160, 100%, 40%, 1);
        cursor: pointer;
    }
}
</style>