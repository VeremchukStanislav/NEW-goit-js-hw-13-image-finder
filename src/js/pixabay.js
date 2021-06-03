const API_KEY = '21907274-5e9640005dddd1cbe205bab1c';
const URL = 'https://pixabay.com/api';

export default class PixabayApiServices {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchHits(){
    const searchParams = new URLSearchParams({
        image_type: 'photo',
        orientation: 'horizontal',
        q: this.searchQuery,
        page: this.numberPage,
        per_page: '12',
        key: API_KEY,
    });
        
    const rawResult = await fetch(`${URL}/?${searchParams}`);

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

