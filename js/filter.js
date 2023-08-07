import { debounce } from './util.js';
const RERENDER_TIMEOUT = 500;
const PICTURES_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filterElement = document.querySelector('.img-filters');
let currentFilter = Filter.DEFAULT;
let pictures = [];

const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (picture1, picture2) =>
  picture2.comments.length - picture1.comments.length;

const getFilteredImages = () => {
  switch(currentFilter) {
    case Filter.RANDOM:
      return [...pictures].sort(sortRandomly).slice(0, PICTURES_COUNT);
    case Filter.DISCUSSED:
      return [...pictures].sort(sortByComments);
    default:
      return [...pictures];
  }
};

const reRenderMiniatures = debounce((callback) => {
  document.querySelectorAll('.picture').forEach((item) => item.remove());

  callback(getFilteredImages());
}, RERENDER_TIMEOUT);

const onFilterClick = (callback) => {
  filterElement.addEventListener('click', (evt) => {
    if(!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const clickedButton = evt.target;
    if(clickedButton.id === currentFilter) {
      return;
    }
    filterElement.querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    currentFilter = clickedButton.id;

    reRenderMiniatures(callback);
  });
};

const init = (loadedPictures, callback) => {
  filterElement.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  onFilterClick(callback);

};

export { init, getFilteredImages};
