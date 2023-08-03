import { createComments, createPhotos } from './data.js';

createComments();
const photos = createPhotos();

import { formThumbnails } from './template.js';

formThumbnails(createPhotos());

import { formGallery } from './gallery.js';

formGallery(photos);

import './form.js';

import { getData } from './api.js';

getData()
  .then((data) => {
    formThumbnails(data);
    formGallery(data);
  });

