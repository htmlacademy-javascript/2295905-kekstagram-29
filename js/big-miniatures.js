import { formComments } from './comments-more.js';


const bigMiniatureElement = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const cancelButtonElement = bigMiniatureElement.querySelector('.big-picture__cancel');


const hideBigMiniature = () => {
  bigMiniatureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigMiniature();
  }
}

const onCancelButtonClick = () => {
  hideBigMiniature();
};

const formPictureDetails = ({ url, likes, description }) => {
  bigMiniatureElement.querySelector('img').src = `${url}`;
  bigMiniatureElement.querySelector('img').alt = description;
  bigMiniatureElement.querySelector('.likes-count').textContent = likes;
  bigMiniatureElement.querySelector('.social__caption').textContent = description;

};

const showBigMiniature = (data) => {
  bigMiniatureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  //commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
  formPictureDetails(data);
  formComments(data.comments);
};

cancelButtonElement.addEventListener('click', onCancelButtonClick);

export { showBigMiniature };

