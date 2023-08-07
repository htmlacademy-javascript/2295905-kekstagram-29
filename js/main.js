import { formThumbnails } from './template.js';
import { formGallery } from './gallery.js';
import './form.js';
import { getData } from './api.js';
import { init } from './filter.js';
import { showAlert } from './util.js';

getData()
  .then((data) => {
    formThumbnails(data);
    formGallery(data);
    init(data, formThumbnails);
  })
  .catch((error) => {
    showAlert(error.message);
  }
  );


