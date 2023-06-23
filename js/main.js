const PHOTO_COUNT = 25;

const LikesRange = {
  MIN: 15,
  MAX: 200,
};

const CommentsRange = {
  MIN: 0,
  MAX: 30,
};

const AvatarRange = {
  MIN: 1,
  MAX: 6,
};

const DESCRIPTIONS = ['На отдыхе', 'У моря', 'На работе', 'На прогулке'];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
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
  avatar: `avatar/${getRandomInteger(AvatarRange.MIN, AvatarRange.MAX)}.svg`,
  message: `${getRandomArrayElement(MESSAGES)}`,
  name: `${getRandomArrayElement(NAMES)}`,
});

const createComments = () =>
  Array.from(
    { length: getRandomInteger(CommentsRange.MIN, CommentsRange.MAX) },
    (_, index) => createComment(index)
  );

const createPhoto = (id) => ({
  id: ++id,
  name: `${getRandomArrayElement(NAMES)}`,
  url: `photos/${id}.jpg`,
  description: `${getRandomArrayElement(DESCRIPTIONS)}`,
  likes: getRandomInteger(LikesRange.MIN, LikesRange.MAX),
  comments: createComments(),
});

const createPhotos = () =>
  Array.from({ length: PHOTO_COUNT }, (_, index) => createPhoto(index));

createComments();
createPhotos();
