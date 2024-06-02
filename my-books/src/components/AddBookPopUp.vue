<script setup>
import BookCard from './BookCard.vue';
import { categories } from '../data/categories';
import { ref, computed } from 'vue';
import { useBooksStore } from '@/stores/db';
import { useRouter } from 'vue-router';
import Book from './Book.vue';

const store = useBooksStore();
const router = useRouter();
const props = defineProps({
    book: Object
});

const coverURL = computed(() => {
    return `http://covers.openlibrary.org/b/id/${props.book.cover_i}-M.jpg`;
});

const authorsString = computed(() => {
    return props.book.author_name.join(', ').trimEnd();
});

</script>

<template>
    <div class="popup">
        <div class="popup-inner">
            <h2> Do you want to add the following book to a category? </h2>
            <Book class="popup-book" :book="props.book" />
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            categories: categories,
        }
    }
}
</script>

<style scoped>

.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 99;

    display: flex;
    align-items: center;
    justify-content: center;

    .popup-inner {
        background: #181818;
        padding: 20px;
        border-radius: 5px;
        width: 80%;
        align-items: center;
        justify-content: center;
        display: flex;
        flex-direction: column;

        .popup-book {
        width: 80%;
        height: 16rem;
        object-fit: cover;
        }
    }

    .card {
        text-align: center;
        text-wrap: wrap;
        height: auto;
    }

}


</style>