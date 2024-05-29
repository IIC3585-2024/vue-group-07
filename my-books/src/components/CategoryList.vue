<template>
    <div>
        <div class="categories">
            <ul>
                <li v-for="category in categories" :key="category.id">
                    <router-link :to="{ name: 'gallery', params: { id: category.id }}">
                        {{ category.name }}
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { categories } from '../data/categories';

export default {
    data() {
        return {
            categories: categories
        }
    }
}
</script>