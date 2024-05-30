<script setup>
import { ref } from 'vue';

const props = defineProps({
    title: String,
    author: String
});
</script>

<template>
    <div class="card">
        <h1>{{ title }}</h1>
        <p>{{ author }}</p>
    </div>
</template>