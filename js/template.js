const ThumbnailTemplate = document
  .querySelector("#picture")
  .content.querySelector(".picture");

const container = document.querySelector(".pictures");

const createThumbnailImage = ({ url, descrition, comments, likes }) => {
  const THUMBNAIL = ThumbnailTemplate.cloneNode(true);

  THUMBNAIL.querySelector(".picture__img").src = url;
  THUMBNAIL.querySelector(".picture__img").alt = descrition;
  THUMBNAIL.querySelector(".picture__likes").textContent = likes;
  THUMBNAIL.querySelector(".picture__comments").textContent = comments.length;

  return THUMBNAIL;
};

const formThumbnails = (pictures) => {
  const FRAGMENT = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const THUMBNAIL = createThumbnailImage(picture);
    FRAGMENT.append(THUMBNAIL);
  });

  container.append(FRAGMENT);
};

export { formThumbnails };
