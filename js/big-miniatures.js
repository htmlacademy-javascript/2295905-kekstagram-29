const bigMiniatureElement = document.querySelector('.big-picture');
const commentCountElement = bigMiniatureElement.querySelector('.social__comment-count');
const commentListElement = bigMiniatureElement.querySelector('.social__comments');
const commentsLoaderElement = bigMiniatureElement.querySelector('.comments-loader');
const bodyElement = document.querySelector('body');
const cancelButtonElement = bigMiniatureElement.querySelector('.big-picture__cancel');
const commentElement = document.querySelector('#comment');

const createComment = ({ avatar, nickname, message }) => {
  const comment = commentElement.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').src = nickname;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const formComments = (comments) => {
  commentListElement.innerHTML = '';

  const fragment = document.createDocumentFragment();
  comments.forEach((item) => {
    const comment = createComment(item);
    fragment.append(comment);
  });

  commentListElement.append(fragment);
};

const hideBigMiniature = () => {
  bigMiniatureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigMiniature();
  }
}

const onCancelButtonClick = () => {
  hideBigMiniature();
};

const formPictureDetails = ({ url, likes, description }) => {
  bigMiniatureElement.querySelector('.big-picture__img img').src = url;
  bigMiniatureElement.querySelector('.big-picture__img img').alt = description;
  bigMiniatureElement.querySelector('.likes-count').textContent = likes;
  bigMiniatureElement.querySelector('.social__caption').textContent = description;
};

const showBigMiniature = (data) => {
  bigMiniatureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  formPictureDetails(data);
  formComments(data.comments);
};

cancelButtonElement.addEventListener('click', onCancelButtonClick);

export { showBigMiniature };
