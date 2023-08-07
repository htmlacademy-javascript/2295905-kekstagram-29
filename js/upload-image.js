const FILE_TYPES = ['png', 'jpg', 'jpeg'];

const fileChooser = document.querySelector('.img-upload__input');
const imagePreview = document.querySelector('.img-upload__preview img');
const form = document.querySelector('.img-upload__form');
const previewEffects = form.querySelectorAll('.effects__preview');


const showPreviewImage = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();


  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if(matches) {
    imagePreview.src = URL.createObjectURL(file);
    previewEffects.forEach((previewEffect) => {
      previewEffect.style.backgroundImage = `url(${imagePreview.src})`;
    });
  }

};

export { showPreviewImage };
