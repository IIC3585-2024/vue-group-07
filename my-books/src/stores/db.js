import { defineStore } from 'pinia'
import { addBook, getBooks, getBooksByCategory, getBook, updateBook, deleteBook, clearBooksinCategory, clearBooks } from '../db/IndexedDB'

export const useBooksStore = defineStore('books', {
    state: () => ({
        books: [],
    }),
    actions: {
        async addBook(book) {
            const tx = await addBook(book);
            return tx;
        },
        async updateBook(book) {
            const tx = await updateBook(book);
            return tx;
        },
        async deleteBook(id) {
            const tx = await deleteBook(id);
            return tx;
        },
        async getBooks() {
            const tx = await getBooks();
            return tx;
        },
        async getBooksByCategory(category) {
            const tx = await getBooksByCategory(category);
            return tx;
        },
        async getBook(id) {
            const tx = await getBook(id);
            return tx;
        },
        async clearBooksinCategory(category) {
            const tx = await clearBooksinCategory(category);
            return tx;
        },
        async clearBooks() {
            const tx = await clearBooks();
            return tx;
        }
    }
})