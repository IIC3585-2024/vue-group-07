import { openDB } from "idb";

const dbPromise = openDB("my-books", 1, {
    upgrade(db) {
        if (!db.objectStoreNames.contains("books")) {
            const store = db.createObjectStore("books", { keyPath: "id", autoIncrement: true });
            store.createIndex("category", "category", { unique: false });
        }
    }
});

export const addBook = async (book) => {
    const db = await dbPromise;
    db.add("books", book);
};

export const updateBook = async (book) => {
    const db = await dbPromise;
    db.put("books", book);
}

export const deleteBook = async (id) => {
    const db = await dbPromise;
    db.delete("books", id);
}

export const getBooks = async () => {
    const db = await dbPromise;
    const tx = db.getAll("books");
    return tx;
}

export const getBooksByCategory = async (category) => {
    const db = await dbPromise;
    const tx = db.getAllFromIndex("books", "category", category);
    return tx;
}

export const getBook = async (id) => {
    const db = await dbPromise;
    const tx = await db.get("books", id)
    return tx;
}

export const clearBooksinCategory = async (category) => {
    const db = await dbPromise;
    const tx = db.clear("books", category);
    return tx;
}

export const clearBooks = async () => {
    const db = await dbPromise;
    const tx = db.clear("books");
    return tx;
}

