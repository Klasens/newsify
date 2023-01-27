const landingModal = document.querySelector('.modal__container');
const landingModalContainer = document.querySelector('.modal__outer');
const landingModalClose = document.querySelector('.modal__close');
const logo = document.querySelector('.logo-container');
const outerModal = document.querySelector('.container');
const noScroll = document.querySelector('#noScroll');

if (window.localStorage.getItem('key')) {
  landingModal.classList.remove('showModal');
  landingModalContainer.classList.remove('showModal');
  landingModalContainer.classList.add('pointerEvents-none');
} else {
  window.localStorage.setItem('key', 'modal');
}
logo.addEventListener('click', function (e) {
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  console.log('test');
  landingModal.classList.add('showModal');
  landingModalContainer.classList.add('showModal');
  landingModalContainer.classList.remove('pointerEvents-none');
  noScroll.classList.add('noScroll');
});

landingModal.addEventListener('click', function (e) {
  e.stopPropagation();
  e.stopImmediatePropagation();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    landingModal.classList.remove('showModal');
    landingModalContainer.classList.remove('showModal');
    noScroll.classList.remove('noScroll');
    landingModalContainer.classList.add('pointerEvents-none');
  }
});

landingModalClose.addEventListener('click', function () {
  landingModal.classList.remove('showModal');
  landingModalContainer.classList.remove('showModal');
  noScroll.classList.remove('noScroll');
  landingModalContainer.classList.add('pointerEvents-none');
});

outerModal.addEventListener('click', function () {
  landingModal.classList.remove('showModal');
  landingModalContainer.classList.remove('showModal');
  noScroll.classList.remove('noScroll');
  landingModalContainer.classList.add('pointerEvents-none');
});
