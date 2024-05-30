<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    title: String,
    authors: Array
});

const authorsString = computed(() => {
    return props.authors.join(', ').trimEnd();
});

</script>

<template>
    <div class="card">
        <h2>{{ title }}</h2>
        <p>{{ authorsString }}</p>
    </div>
</template>

<style>
.card {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    width: 16rem;
    height: 20rem;
    text-align: center;
}

</style>