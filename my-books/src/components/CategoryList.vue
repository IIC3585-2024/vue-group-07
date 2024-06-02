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