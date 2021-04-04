import './index.css';

import UserInfo from  '../components/UserInfo.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import {Card} from '../components/Card.js';
import {initialCards, validItems} from '../utils/initialCards.js';
import {FormValidator} from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';


const profileEdit = document.querySelector('.profile__button_edit');
const addButtonElement = document.querySelector('.profile__button_plus');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

const formProfile = document.querySelector('.popup__form_profile');
const formPlace = document.querySelector('.popup__form_places');


const validFormProfile = new FormValidator(validItems, formProfile);
const validFormPlace = new FormValidator(validItems, formPlace);

const zoomImagePopup = new PopupWithImage('.popup-image');

const userAbout = new UserInfo({name: '.profile__title', info: '.profile__subtitle'});

const editPopupProfile = new PopupWithForm({handlePopupForm: (data) => {
  userAbout.setUserInfo(data);
}}, '.popup_profile');
editPopupProfile.setEventListeners();

function openProfilePopup(){
  editPopupProfile.open();
  nameInput.value = userAbout.getUserInfo().name;
  jobInput.value = userAbout.getUserInfo().info;
  validFormProfile.resetErrors();
  validFormProfile.toggleButtonState();
}

const editPopupPlace = new PopupWithForm({handlePopupForm: (data) => {
  addNewItem(data);
}}, '.popup_places');
editPopupPlace.setEventListeners();

function openPlacePopup(){
  editPopupPlace.open();
  validFormPlace.resetErrors();
  validFormPlace.toggleButtonState();
}

function addNewItem(data){
  const newItemHTML = { link: data.popupLink, name: data.popupPlace};
  renderList.addItem(createCard(newItemHTML));
}

const createCard = (item) => {
  const card = new Card(item, '.template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
};

const renderList = new Section({
  items: initialCards,
  renderer: (item) => {
    renderList.addItem(createCard(item));
}}, '.elements__list');

function handleCardClick(name, link){
  zoomImagePopup.open({name, link});
}

zoomImagePopup.setEventListeners();

profileEdit.addEventListener('click', openProfilePopup);
addButtonElement.addEventListener('click', openPlacePopup);

validFormProfile.enableValidation();
validFormPlace.enableValidation();

renderList.renderer();