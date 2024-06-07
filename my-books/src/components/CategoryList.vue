<script setup>
import { categories } from '../data/categories';
import { useCurrentStore } from '@/stores/current';
import { useRouter } from 'vue-router';

const store = useCurrentStore();
const router = useRouter();
const moveCategory = (category) => {
    store.setCurrentCategory(category);
    router.push({ name: 'gallery', params: { category: category.id } });
}

</script>

<template>
    <div>
        <div class="categories">
            <ul>
                <li v-for="category in categories" :key="category.id">
                    <a @click="moveCategory(category)">
                        {{ category.name }}
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
