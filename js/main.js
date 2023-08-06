import { createComments, createPhotos } from './data.js';

createComments();
createPhotos();


import { formThumbnails } from './template.js';


import { formGallery } from './gallery.js';


import './form.js';

import { getData } from './api.js';
//import { getFilteredImages } from './filter.js';

getData()
  .then((data) => {
    formThumbnails(data);
    formGallery(data);
  });

import { showAlert, debounce } from './util.js';

try {
  await getData();
  debounce(formGallery);
  //formGallery(getFilteredImages());
} catch(err) {
  showAlert(err.message);
}

