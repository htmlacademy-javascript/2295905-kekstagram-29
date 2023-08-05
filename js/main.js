import { createComments, createPhotos } from './data.js';

createComments();
const photos = createPhotos();

import { formThumbnails } from './template.js';

formThumbnails(createPhotos());

import { formGallery } from './gallery.js';

formGallery(photos);

import './form.js';

import { getData } from './api.js';
import { getFilteredImages } from './filter.js';

getData()
  .then((data) => {
    formThumbnails(data);
    formGallery(data);
  });

import { showAlert, debounce } from './util.js';

try {
  await getData();
  debounce(formGallery);
  formGallery(getFilteredImages());
} catch(err) {
  showAlert(err.message);
}

