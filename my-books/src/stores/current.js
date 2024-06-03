import { defineStore } from 'pinia'

export const useCurrentStore = defineStore('current', {
    state: () => ({
        currentCategory: null,
        currentBook: null
    }),
    actions: {
        setCurrentCategory(category) {
            this.currentCategory = category
        },
        setCurrentBook(book) {
            this.currentBook = book
        }
    }
})