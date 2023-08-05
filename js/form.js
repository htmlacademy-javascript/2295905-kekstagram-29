import { resetScale } from './modal-scale.js';
import {
  init as initEffect,
  reset as resetEffect
} from './form-effect.js';

import { showPreviewImage } from './upload-image.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^[a-zа-яё0-9]{1,19}$/i;
const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хэштег',
};

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const fileField = form.querySelector('.img-upload__input');
const cancelButton = form.querySelector('.img-upload__cancel');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

};

const hideModal = () => {
  form.reset();
  resetScale();
  resetEffect();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

/*const isTextFieldFocused = () => {
  document.activeElement === hashtagField || document.activeElement === commentField;
}*/

const normalizeTags = (tagString) => tagString
  .trim()
  .split()
  .filter((tag) => Boolean(tag.length));

const areValidTags = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));

const areValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;

const areUniqueTags = (value) => {
  const toLowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return toLowerCaseTags.length === new Set(toLowerCaseTags).size;
};

function onDocumentKeydown(evt) {
  if(evt.key === 'Escape') {
    evt.preventDefault();
    hideModal();
  }
}

const onCancelButtonClick = () => {
  hideModal();
};

const onFileInputChange = () => {
  showModal();
  showPreviewImage();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

pristine.addValidator(
  hashtagField,
  areValidCount,
  ErrorText.INVALID_COUNT,
  3,
  true
);
pristine.addValidator(
  hashtagField,
  areUniqueTags,
  ErrorText.NOT_UNIQUE,
  1,
  true
);
pristine.addValidator(
  hashtagField,
  areValidTags,
  ErrorText.INVALID_PATTERN,
  2,
  true
);

fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);
form.addEventListener('submit', onFormSubmit);
initEffect();

commentField.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});
