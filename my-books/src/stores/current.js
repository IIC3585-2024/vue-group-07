import { defineStore } from 'pinia'

export const useCurrentStore = defineStore('current', {
    state: () => ({
        currentCategory: null,
        currentBook: null
    }),
    getters: {
        getCurrentCategory() {
            return this.currentCategory
        },
        getCurrentBook() {
            return this.currentBook
        }
    },
    actions: {
        setCurrentCategory(category) {
            this.currentCategory = category
        },
        setCurrentBook(book) {
            this.currentBook = book
        }
    }
})