import { showBigMiniature } from './big-miniatures.js';


const container = document.querySelector('.pictures');

const formGallery = (pictures) => {
  container.addEventListener('click', (evt) => {

    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if(!thumbnail) {
      return;
    }
    evt.preventDefault();
    const picture = pictures.find(
      (item) =>
        item.id === +thumbnail.dataset.thumbnailId
    );
    showBigMiniature(picture);
  });

};

export { formGallery };
