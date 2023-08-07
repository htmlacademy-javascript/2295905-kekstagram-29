import { showAlert, isEscapeKey } from './util.js';
import { onDocumentKeydown, hideModal } from './form.js';

const form = document.querySelector('.img-upload__form');
const uploadWrapper = document.querySelector('.img-upload__wrapper');
const fileChooser = document.querySelector('.img-upload__input');


const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const showError = (message) => {
  const errorElement = errorTemplate.cloneNode(true);
  const errorInnerContainer = errorElement.querySelector('.error__inner');
  const errorTitle = errorElement.querySelector('.error__title');
  const errorButton = errorElement.querySelector('.error__button');
  errorTitle.textContent = message;
  document.removeEventListener('keydown', onDocumentKeydown);
  let returnToFormOnEscapeClick = () => {};

  const removeErrorMessage = () => {
    errorButton.removeEventListener('click', removeErrorMessage);
    document.removeEventListener('keydown', returnToFormOnEscapeClick);
    document.addEventListener('keydown', onDocumentKeydown);
    uploadWrapper.classList.remove('hidden');
    errorElement.remove();
  };

  returnToFormOnEscapeClick = (evt) => {
    if (isEscapeKey(evt)) {
      removeErrorMessage();
    }
  };

  document.addEventListener('keydown', returnToFormOnEscapeClick);

  const onOutsideErrorContainerClick = (evt) => {
    const outsideErrorContainerClick = evt.composedPath().includes(errorInnerContainer) === false;
    if (outsideErrorContainerClick) {
      document.removeEventListener('click', onOutsideErrorContainerClick);
      removeErrorMessage();
    }
  };

  document.addEventListener('click', onOutsideErrorContainerClick);
  errorButton.addEventListener('click', removeErrorMessage);

  form.appendChild(errorElement);
};

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const showSuccess = () => {
  const successElement = successTemplate.cloneNode(true);
  const successInnerContainer = successElement.querySelector('.success__inner');
  const successButton = successElement.querySelector('.success__button');
  hideModal();
  let returnToFormOnEscapeClick = () => {};
  const removeSuccessMessage = () => {
    successButton.removeEventListener('click', removeSuccessMessage);
    document.removeEventListener('keydown', returnToFormOnEscapeClick);
    uploadWrapper.classList.remove('hidden');
    successElement.remove();
    fileChooser.value = '';
  };
  returnToFormOnEscapeClick = (evt) => {
    if (isEscapeKey(evt)) {
      removeSuccessMessage();
    }
  };
  document.addEventListener('keydown', returnToFormOnEscapeClick);
  successButton.addEventListener('click', removeSuccessMessage);

  const onOutsideSuccessContainerClick = (evt) => {
    const outsideErrorContainerClick = evt.composedPath().includes(successInnerContainer) === false;
    if (outsideErrorContainerClick) {
      document.removeEventListener('click', onOutsideSuccessContainerClick);
      removeSuccessMessage();
    }
  };

  document.addEventListener('click', onOutsideSuccessContainerClick);

  form.appendChild(successElement);
};

export { showError, showAlert, showSuccess};

