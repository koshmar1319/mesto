import {Card} from './Card.js';
import {initialCards, validItems} from './initialCards.js';
import {FormValidator} from './FormValidator.js';


const profileEdit = document.querySelector('.profile__button_edit');
const popupProfile = document.querySelector('.popup_profile');
const popupPlace = document.querySelector('.popup_places');

const popupCloseProfile = document.querySelector('.popup__close_type_edit-profile');
const popupClosePlace = document.querySelector('.popup__close_type_new-place');
const popupImageCloseBtn = document.querySelector('.popup__close_type_zoom-image');

const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');

const addButtonElement = document.querySelector('.profile__button_plus');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

const inputPlace = document.querySelector('.popup__input_type_place');
const inputLink = document.querySelector('.popup__input_type_link');

const popupZoomImage = document.querySelector('.popup-image__photo');
const popupImageDescription = document.querySelector('.popup-image__descr');
const popupImage = document.querySelector('.popup-image');

const listContainerElement = document.querySelector('.elements__list');

const formProfile = document.querySelector('.popup__form_profile');
const formPlace = document.querySelector('.popup__form_places');

const popups = document.querySelectorAll('.popup');

const validFormProfile = new FormValidator(validItems, formProfile);
const validFormPlace = new FormValidator(validItems, formPlace);

function openPopup(popup){
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleButtonEsc);
}

function closePopup() {
  const popupOpened = document.querySelector('.popup_opened');
  popupOpened.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleButtonEsc);
}

function openProfilePopup(){
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubTitle.textContent;
  openPopup(popupProfile);
  validFormProfile.resetErrors();
}

function handleProfilePopup(){
  profileTitle.textContent = nameInput.value;
  profileSubTitle.textContent = jobInput.value;
  closePopup(popupProfile);
}

function openPlacePopup(){
  formPlace.reset();
  validFormPlace.resetErrors();
  openPopup(popupPlace);
}

function handlePlacePopup(){
  addNewItem();
  closePopup(popupPlace);
}

const renderList = (arr) => {
  arr.map((data) => {
    listContainerElement.append(createCard(data, '.template'));
  });
}

const createCard = (item, cardSelector) => {
  const card = new Card(item, cardSelector);
  const cardElement = card.generateCard();
  return cardElement;
};

function addNewItem(){
  const newItemHTML = { link: inputLink.value, name: inputPlace.value};
  listContainerElement.prepend(createCard(newItemHTML, '.template'));
}

function handleButtonEsc(evt){
  if(evt.key === 'Escape'){
    closePopup();
  }
}

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')){
      closePopup();
    }
  })
});

popupCloseProfile.addEventListener('click', closePopup);
popupClosePlace.addEventListener('click', closePopup);
popupImageCloseBtn.addEventListener('click', closePopup);

profileEdit.addEventListener('click', openProfilePopup);
formProfile.addEventListener('submit', handleProfilePopup);

addButtonElement.addEventListener('click', openPlacePopup);
formPlace.addEventListener('submit', handlePlacePopup);


validFormProfile.enableValidation();
validFormPlace.enableValidation();

renderList(initialCards);

export {popupZoomImage, popupImageDescription, popupImage, openPopup};