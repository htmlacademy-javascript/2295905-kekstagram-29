const bigMiniatureElement = document.querySelector('.big-picture');
const commentListElement = bigMiniatureElement.querySelector('.social__comments');
const commentElement = document.querySelector('#comment');
const INITIAL_COUNT = 5;
const commentCurrentCountElement = document.querySelector('.social__comment-current-count');
const commentTotalCountElement = document.querySelector('.comments-count');
const showMoreButton = document.querySelector('.comments-loader');

let currentCount = 5;
let totalCount = 0;
const STEP = 5;
let currentComments = [];

const createComment = ({ avatar, nickname, message, }) => {
  const comment = commentElement.cloneNode(true);


  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = nickname;
  comment.querySelector('.social__text').textContent = message;


  return comment;
};

const renderComments = () => {
  commentListElement.innerHTML = '';

  const fragment = document.createDocumentFragment();
  currentComments.forEach((item, index) => {
    if(index < currentCount) {
      const comment = createComment(item);
      fragment.append(comment);
    }
  });

  commentListElement.append(fragment);
};

const onShowMoreButtonClick = () => {
  if(currentCount < totalCount) {
    if(STEP + currentCount < totalCount) {
      currentCount += STEP;
    } else {
      currentCount += totalCount - currentCount;
    }
    if(currentCount === totalCount) {
      showMoreButton.classList.add('hidden');
    }

    commentCurrentCountElement.textContent = currentCount;
    renderComments();
  }
};

const formComments = (comments) => {
  totalCount = comments.length;
  commentListElement.innerHTML = '';
  if(totalCount >= INITIAL_COUNT) {
    showMoreButton.classList.remove('hidden');
    currentCount = INITIAL_COUNT;
  } else {
    showMoreButton.classList.add('hidden');
    currentCount = totalCount;
  }

  commentCurrentCountElement.textContent = currentCount;
  commentTotalCountElement.textContent = totalCount;

  const fragment = document.createDocumentFragment();
  comments.forEach((item, index) => {
    if(index < INITIAL_COUNT) {
      const comment = createComment(item);
      fragment.append(comment);
    }
  });

  showMoreButton.addEventListener('click', onShowMoreButtonClick);
  commentListElement.append(fragment);
  currentComments = comments;
};


export { formComments };
