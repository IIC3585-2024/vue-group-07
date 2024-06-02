import { useBooksStore } from "@/stores/db";

export async function getBooksByCategory(category) {
    try {
        const booksStore = useBooksStore();
        // get books from the store, based on the current category
        if (!category || category.id === "all") {
            const books = await booksStore.getBooks();
            return books;
        } else {
            const books = booksStore.getBooksByCategory(category.id);
            return books;
        }
    } catch (error) {
        console.error(error);
    }
}