<script setup>
import { categories } from '../data/categories';
import { useSearchBookStore } from '@/stores/searchBooks';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { ref } from 'vue';
import BookCard from './BookCard.vue';
import AddBookPopUp from './AddBookPopUp.vue';

const text = ref('');
const field = ref('q');

// TODO: Mover función a un archivo de utilidades
function searchBook() {
    const store = useSearchBookStore();
    // get values from the input fields
    let searchQuery = '';
    if (field.value === 'q') {
        searchQuery = `q=${this.text}`;
    } else {
        searchQuery = `${this.field}=${this.text}`;
    }
    
    // if no search query is provided, search for the lord of the rings
    if (!searchQuery) {
        searchQuery = "title=the+lord+of+the+rings";
    }
    // get the search results from the API
    try {
        axios.get(`http://openlibrary.org/search.json?${searchQuery}&page=1&limit=20`)
            .then(response => {
                store.setSearchQuery(searchQuery);
                store.setSearchResults(response.data.docs);
                // update the books data with the search results
                books.value = response.data.docs
                    .filter(book => 'author_name' in book && 'title' in book && 'cover_i' in book);
                console.log(books.value)
            });
    } catch (error) {
        console.error(error);
    }
}

</script>

<template>
    <div>
        <h2> Search Book </h2>
        <input type = "text" placeholder = "The lord of the rings" v-model = "text">
        <select v-model = "field">
            <option value = "q"> All </option>
            <option value = "title"> Title </option>
            <option value = "author"> Author </option>
        </select>
        <button @click = "searchBook()"> Search </button>
        <div>
            <h3> Search Results </h3>
            <div class = "gallery">
                <BookCard v-for = "book in books" :title = "book.title" :authors = "book.author_name" :cover-i = "book.cover_i" @click = "addBook(book)"/>
            </div>
        </div>
    </div>

    <AddBookPopUp v-if = "showAddBookPopUp" :book = "selectedBook"/>
</template>

<script>

const books = ref([]);
const showAddBookPopUp = ref(false);
const selectedBook = ref(null);



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
export default {
    data() {
        return {
            categories: categories,
        }
    },
    components: {
        BookCard,
        AddBookPopUp
    },
}
</script>