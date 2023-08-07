import { isEscapeKey, SubmitButtonText, disableEscHandling } from './util.js';
import { sendData } from './api.js';
import { showSuccess, showError } from './alerts.js';

const FILE_TYPES = ['png', 'jpg', 'jpeg'];

const fileChooser = document.querySelector('.img-upload__input');
const imagePreview = document.querySelector('.img-upload__preview img');
const form = document.querySelector('.img-upload__form');
const previewEffects = form.querySelectorAll('.effects__preview');
const uploadWrapper = form.querySelector('.img-upload__wrapper');
const submitButton = form.querySelector('.img-upload__submit');
const uploadOverlay = form.querySelector('.img-upload__overlay');
const sliderControlContainer = form.querySelector('.effect-level__slider');
const sliderWrapper = form.querySelector('.effect-level');
const cancelUploadButton = form.querySelector('.img-upload__cancel');
const hashTagInput = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

let clearUpload = () => {};

const cancelUploadByKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    clearUpload();
  }
};


const showPreviewImage = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();


  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if(matches) {
    imagePreview.src = URL.createObjectURL(file);
    previewEffects.forEach((previewEffect) => {
      previewEffect.style.backgroundImage = `url(${imagePreview.src})`;
    });
  }


  document.body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', cancelUploadByKeydown);
  imagePreview.style.filter = 'none';
  imagePreview.style.transform = 'none';

  const isSliderControlShown = sliderControlContainer.classList.contains('hidden') === false;
  if (isSliderControlShown) {
    sliderControlContainer.classList.add('hidden');
    sliderWrapper.classList.add('hidden');
  }
};

clearUpload = () => {
  document.body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', cancelUploadByKeydown);
  form.reset();
  pristine.reset();
};

fileChooser.addEventListener('change', showPreviewImage);
cancelUploadButton.addEventListener('click', clearUpload);

noUiSlider.create(sliderControlContainer, {
  connect: 'lower',
  range: {
    'min': 0,
    'max': 0
  },
  start: 0,
  step: 0,
  format: {
    to(value) {
      if (Number.isInteger(value)) {
        return value.toFixed(2);
      }
      return value.toFixed(2);
    },
    from(value) {
      return parseFloat(value);
    },
  },
});


const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const initUploadImageForm = () => {
  disableEscHandling(hashTagInput);
  disableEscHandling(commentField);

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(
          () => {
            showSuccess();
          }
        )
        .catch(
          (err) => {
            showError(err.message);
          }
        )
        .finally(unblockSubmitButton);
    }
  });
};

export { showPreviewImage,
  initUploadImageForm,
  cancelUploadByKeydown,
  uploadWrapper,
  form,
  fileChooser,
  clearUpload
};
