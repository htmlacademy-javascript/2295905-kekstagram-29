import { createComments, createPhotos } from './data.js';

createComments();
createPhotos();


import { formThumbnails } from './template.js';


import { formGallery } from './gallery.js';


import './form.js';

import { getData } from './api.js';
import { getFilteredImages } from './filter.js';

import { init } from './filter.js';

getData()
  .then((data) => {
    formThumbnails(data);
    formGallery(data);
    init(data, formThumbnails);
  });

import { showAlert, debounce } from './util.js';

try {
  await getData();
  debounce(formGallery);
  formGallery(getFilteredImages());
} catch(err) {
  showAlert(err.message);
}


import {showPreviewImage,
  initUploadImageForm,
  cancelUploadByKeydown,
  uploadWrapper,
  form,
  fileChooser,
  clearUpload } from './upload-image.js';

showPreviewImage();
initUploadImageForm();
cancelUploadByKeydown();
uploadWrapper();
form();
fileChooser();
clearUpload();
