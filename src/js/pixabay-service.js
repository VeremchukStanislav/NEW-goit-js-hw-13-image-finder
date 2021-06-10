const API_KEY = '21405447-01f360137f209ab5af64c83fa';
const BASE_URL = 'https://pixabay.com/api';

export default class PixabayApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchHits() {
        const searchParams = new URLSearchParams({
            image_type: 'photo',
            orientation: 'horizontal',
            q: this.searchQuery,
            page: this.page,
            per_page: '12',
            key: API_KEY,
        });

        const rawResult = await fetch(`${BASE_URL}/?${searchParams}`);
        
        if (!rawResult.ok) {
            throw rawResult;
        }
        
        const result = await rawResult.json();
        this.incrementPage();

        return result.hits;
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}