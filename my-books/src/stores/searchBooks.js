import { defineStore } from 'pinia'

export const useSearchBookStore = defineStore('search', {
    state: () => ({
        searchQuery: '',
        searchResults: []
    }),
    actions: {
        setSearchQuery(query) {
            this.searchQuery = query
        },
        setSearchResults(results) {
            this.searchResults = results
        }
    }
})