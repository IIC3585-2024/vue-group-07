<template>
    <div class="board">
        <div class="row scroll-container">
            <div class="col" v-for="category in categories" :key="category.id">
                <a @click="moveCategory(category)">
                    {{ category.name }}
                </a>
            </div>
        </div>
    </div>
</template>

<style>

.board {
    border: 2px solid gray;
    border-radius: 3px;
}

.row {
    display: flex;
    padding: 10px;
    min-height: 70vh;
}

.col {
    display: grid;
    column-gap: 50px;
    border: 2px solid gray;
    border-radius: 3px;
    padding: 10px;
    margin: 0 5px;
    min-width: 300px;
}

.scroll-container {
    width: 100%;
    overflow-x: auto;
    white-space: nowrap;
}
</style>

<script>
import { categories } from '../data/categories';
import { useCurrentStore } from '@/stores/current';

import { useRouter } from 'vue-router';



export default {
    setup() {
        const store = useCurrentStore();
        const router = useRouter();
        const moveCategory = (category) => {
            store.setCurrentCategory(category);
            router.push({ name: 'gallery' });
        }

        return {
            moveCategory
        }
    },
    data() {
        return {
            categories: categories,
        }
    }
}
</script>