import { showBigMiniature } from './big-miniatures.js';


const container = document.querySelector('.pictures');

const formGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    evt.preventDefault();
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if(!thumbnail) {
      return;
    }

    const picture = pictures.find(
      (item) =>
        item.id === +thumbnail.dataset.thumbnailId
    );
    showBigMiniature(picture);
  });

};

export { formGallery };
