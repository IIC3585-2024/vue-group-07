<template>
    <div>
        <h1> gallery </h1>
        <h2> {{ currentCategory.name }} </h2>
        <ul>
            <li v-for="book in books" :key="book.id">
                <h3>{{ book.title }}</h3>
                <p>{{ book.author }}</p>
                <p>{{ book.description }}</p>
            </li>
        </ul>

    </div>
</template>

<script>
import { useCurrentStore } from '@/stores/current';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
    setup() {
        const store = useCurrentStore();
        const router = useRouter();
        const currentCategory = store.currentCategory;
        return {
            currentCategory
        }
    },
    mounted() {
        try {
            // get books from the API and set them to the books data , get first 10 books
            axios.get('http://openlibrary.org/search.json?title=the+lord+of+the+rings&page=1&limit=10')
                .then(response => {
                    this.books = response.data.docs;
                });
        } catch (error) {
            console.error(error);
        }
    },
    data() {
        return {
            books: []
        }
    }     
}

</script>