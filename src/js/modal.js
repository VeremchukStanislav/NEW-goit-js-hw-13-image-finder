import refs from './refs';
import * as basicLightbox from 'basiclightbox';

refs.gallery.addEventListener('click', onImageClick);

function onImageClick(e) {
    if (!e.target.classList.contains('image-item')) {
        return;
    };

    const largeImage = e.target.dataset.source;
    onOpenModal(largeImage);
};

function onOpenModal(src) {
    const modal = basicLightbox.create(`
	 	<img width="1400" height="900" src="${src}">
	`).show();
};