import PixabayApiService from './pixabay-service';
import refs from './refs';
import hitsTpl from '../templates/hits.hbs';
import { invalidQueryNotice, errorNotice } from './notice';

const pixabayApiService = new PixabayApiService();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
    e.preventDefault();
    pixabayApiService.resetPage();
    pixabayApiService.query = e.currentTarget.elements.query.value;
    
    if (pixabayApiService.query === ''|| !pixabayApiService.query.trim()) {
        return invalidQueryNotice();
    }
    
    onSearchFetchHits();
};

async function onSearchFetchHits() {
    try {
        const result = await pixabayApiService.fetchHits();
        if (result.length === 0) {
            invalidQueryNotice();
            return;
        };
        clearGallery();
        appendHitsMarkup(result);
    } catch (error) {
        errorNotice();
    };
};

function appendHitsMarkup(hits) {
    refs.gallery.insertAdjacentHTML('beforeend', hitsTpl(hits));
}

function clearGallery() {
    refs.gallery.innerHTML = '';
}

const onEntry = entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && pixabayApiService.query !== '') {
            onEntryFetchHits();
        };
    });
};

async function onEntryFetchHits(){
    const result = await pixabayApiService.fetchHits();
    appendHitsMarkup(result);
};

const observer = new IntersectionObserver(onEntry, {
    rootMargin: '100px',
});

observer.observe(refs.container2);