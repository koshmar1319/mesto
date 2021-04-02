import './pages/index.css';

import UserInfo from  './components/UserInfo.js';
import Section from './components/Section.js';
import PopupWithForm from './components/PopupWithForm.js';
import {Card} from './components/Card.js';
import {initialCards, validItems} from './components/initialCards.js';
import {FormValidator} from './components/FormValidator.js';
import PopupWithImage from './components/PopupWithImage.js';


const popupProfile = document.querySelector('.popup_profile');
const popupPlace = document.querySelector('.popup_places');

const profileEdit = document.querySelector('.profile__button_edit');
const addButtonElement = document.querySelector('.profile__button_plus');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

const popupZoomImage = document.querySelector('.popup-image__photo');
const popupImageDescription = document.querySelector('.popup-image__descr');
const popupImage = document.querySelector('.popup-image');

const formProfile = document.querySelector('.popup__form_profile');
const formPlace = document.querySelector('.popup__form_places');


const validFormProfile = new FormValidator(validItems, formProfile);
const validFormPlace = new FormValidator(validItems, formPlace);

const userAbout = new UserInfo({name: '.profile__title', info: '.profile__subtitle'});

const editPopupProfile = new PopupWithForm({handlePopupForm: (data) => {
  userAbout.setUserInfo(data);
}}, popupProfile);
editPopupProfile.setEventListeners();

function openProfilePopup(){
  editPopupProfile.open();
  nameInput.value = userAbout.getUserInfo().name;
  jobInput.value = userAbout.getUserInfo().info;
  validFormProfile.resetErrors();
}

const editPopupPlace = new PopupWithForm({handlePopupForm: (data) => {
  addNewItem(data);
}}, popupPlace);
editPopupPlace.setEventListeners();

function openPlacePopup(){
  editPopupPlace.open();
  validFormPlace.resetErrors();
}

function addNewItem(data){
  const newItemHTML = { link: data.popupLink, name: data.popupPlace};
  createCard(newItemHTML);
}

const createCard = (item) => {
  const card = new Card(item, '.template', handleCardClick);
  const cardElement = card.generateCard();
  renderList.addItem(cardElement, 'prepend');
  return cardElement;
};

const renderList = new Section({
  items: initialCards,
  renderer: (item) => {
    renderList.addItem(createCard(item));
}}, '.elements__list');

const handleCardClick = (popupZoomImage, popupImage) => {
  const zoomImagePopup = new PopupWithImage(popupZoomImage, popupImage);
  zoomImagePopup.open();
}


profileEdit.addEventListener('click', openProfilePopup);
addButtonElement.addEventListener('click', openPlacePopup);

validFormProfile.enableValidation();
validFormPlace.enableValidation();

renderList.renderer();

export {popupZoomImage, popupImageDescription, popupImage};