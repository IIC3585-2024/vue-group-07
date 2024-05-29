import { defineStore } from 'pinia'

export const useSearchBookStore = defineStore('search', {
    state: () => ({
        searchQuery: '',
        searchResults: []
    }),
    getters: {
        getSearchQuery() {
            return this.searchQuery
        },
        getSearchResults() {
            return this.searchResults
        }
    },
    actions: {
        setSearchQuery(query) {
            this.searchQuery = query
        },
        setSearchResults(results) {
            this.searchResults = results
        }
    }
})