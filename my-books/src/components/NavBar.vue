<template>
<div class="navbar">
    <div class="navtabs">
        <h1 class="brand">
            My books 📚
        </h1>
        <router-link
            :to="tab.route"
            v-for="(tab, index) in tabs"
            :key="index"
            @click="activateTab(tab)"
            :class="{ 'navtab': true, 'active': tab.active }"
            :data-target="tab.id"
        >
            
            {{ tab.name }} 
        </router-link>
    </div>
</div>
</template>
  
<script>
import { categories } from '../data/categories';
import { useCurrentStore } from '@/stores/current';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
export default {
    data() {
        return {
        tabs: [
            { id: 'board', name: 'Board', route: '/', active: true },
            { id: 'all-books', name: 'All Books', route: '/gallery/all', active: false },
            { id: 'add-book', name: 'Add Book', route: '/add-book', active: false },
        ],
        categories: categories,
        };
    },

    setup() {
        const router = useRouter();
    },

    methods: {
        activateTab(selectedTab) {
        this.tabs.forEach(tab => {
            tab.active = tab.id === selectedTab.id;
        });
        },
        
    },
};
</script>
  
<style scoped>

.brand {
    line-height: normal;
    margin-right: auto;
}

.navbar {
    z-index: 98;
    position: fixed;
    top: 0;
    left: 10%;
    width: 80%;
}

.navtabs {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    background: #202020;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding: 10px 20px;
    position: relative;
    overflow-x: auto;
    white-space: nowrap;
}

.navtab {
    margin: 0 20px;
    padding: 10px 20px;
    cursor: pointer;
    color: #fff !important;
    transition: color 0.3s;
}

.navtab:hover {
    color: hsla(160, 100%, 37%, 1) !important;
}

.navtab.active {
    color: hsla(160, 100%, 37%, 1) !important;
    font-weight: 600 !important;
}

</style>  