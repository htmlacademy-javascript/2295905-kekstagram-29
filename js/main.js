import { createComments, createPhotos } from "./data.js";

createComments();
createPhotos();

import { formThumbnails } from "./template.js";

formThumbnails(createPhotos());
