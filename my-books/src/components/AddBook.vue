<script setup>
import { categories } from '../data/categories';
import { useSearchBookStore } from '@/stores/searchBooks';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { ref } from 'vue';

</script>

<template>
    <div>
        <h2> Search Book </h2>
        <input type = "text" placeholder = "Title" >
        <input type = "text" placeholder = "Author">
        <input type = "text" placeholder = "ISBN">
        <select>
            <option> Select Category </option>
            <option v-for = "category in categories" :key = "category.id"> {{ category.name }} </option>
        </select>
        <button @click = "searchBook()"> Search </button>
        <div>
            <h3> Search Results </h3>
            <ul>
                <li v-for = "book in books" :key = "book.id">
                    <h3> {{ book.title }} </h3>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

const books = ref([]);

function updateBooks(searchResults) {
    books.value = searchResults;
}

function searchBook() {
    console.log("searching book")
    const store = useSearchBookStore();
    try {
        axios.get('http://openlibrary.org/search.json?title=the+lord+of+the+rings&page=1&limit=10')
            .then(response => {
                store.setSearchQuery("title=the+lord+of+the+rings");
                store.setSearchResults(response.data.docs);
                // update the books data with the search results
                updateBooks(response.data.docs)
            });
    } catch (error) {
        console.error(error);
    }
}
export default {
    data() {
        return {
            categories: categories
        }
    }
}
</script>