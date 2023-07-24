const thumbnailTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');

const container = document.querySelector('.pictures');

const createThumbnailImage = ({ url, descrition, comments, likes }) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = descrition;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  return thumbnail;
};

const formthumbnails = (pictures) => {
  const fragment = document.createDocumentfragment();
  pictures.forEach((picture) => {
    const thumbnail = createthumbnailImage(picture);
    fragment.append(thumbnail);
  });

  container.append(fragment);
};

export { formthumbnails };


