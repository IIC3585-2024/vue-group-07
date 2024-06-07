<script setup>
import Book from './Book.vue';

const props = defineProps({
    book: Object,
    closeFunction: Function,
});

</script>

<template>
    <div class="popup">
        <div class="popup-inner">
            <div id="close-block">
                <img class="close-btn" src="../assets/close.svg" alt="Close" @click="closeFunction()"/>
            </div>
            <h2> Do you want to add the following book to a category? </h2>
            <Book class="popup-book" :book="props.book" :closeFunction="closeFunction"/>
        </div>
    </div>
</template>

<style scoped>

#close-block {
    display: flex;
    justify-content: flex-end;
    position: sticky;
    top: 0;
    padding: 20px 0;
    background-color: #181818;
    
    width: 100%;
    .close-btn {
        cursor: pointer;
        fill: white;
    }
}

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
        padding: 0 20px;
        border-radius: 8px;
        width: 80%;
        align-items: center;
        justify-content: center;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        max-height: 80vh;

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