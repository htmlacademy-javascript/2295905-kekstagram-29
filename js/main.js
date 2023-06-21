const PHOTO_COUNT = 25;

const likesRange = {
  MIN: 15,
  MAX: 200,
};

const commentsRange = {
  MIN: 0,
  MAX: 30,
};

const avatarRange = {
  MIN: 1,
  MAX: 6,
};

const description = ['На отдыхе', 'У моря', 'На работе', 'На прогулке'];

const message = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAME = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const getRandomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const createComment = (id) => ({
  id: ++id,
  avatar: `avatar/${getRandomInteger(avatarRange.MIN, avatarRange.MAX)}.svg`,
  message: `${getRandomArrayElement(message)}`,
  name: `${getRandomArrayElement(NAME)}`,
});

const createPhoto = (id) => ({
  id: ++id,
  name: `${getRandomArrayElement(NAME)}`,
  url: `photos/${id}.jpg`,
  description: `${getRandomArrayElement(description)}`,
  likes: getRandomInteger(likesRange.MIN, likesRange.MAX),
  comments: createComment(),
});

const createComments = () =>
  Array.from(
    { length: getRandomInteger(commentsRange.MIN, commentsRange.MAX) },
    (_, index) => createComment(index)
  );
const createPhotos = () =>
  Array.from({ length: PHOTO_COUNT }, (_, index) => createPhoto(index));

createComments();
createPhotos();
