import './index.css';

import Section from '../components/Section.js';
import Api from '../components/Api.js';
import UserInfo from  '../components/UserInfo.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import {validItems} from '../utils/validConfig.js';


const profileEdit = document.querySelector('.profile__button_edit');
const addButtonElement = document.querySelector('.profile__button_plus');

const avatarEdit = document.querySelector('.profile__button_avatar');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

const formProfile = document.querySelector('.popup__form_profile');
const formPlace = document.querySelector('.popup__form_places');
const formUpdate = document.querySelector('.popup-upd__form');

const validFormProfile = new FormValidator(validItems, formProfile);
const validFormPlace = new FormValidator(validItems, formPlace);
const validFormUpdate = new FormValidator(validItems, formUpdate);


const api = new Api({
  token: "23cb390e-6742-419b-8dec-601afe24420f",
  groupID: "cohort-22"
});

const userAbout = new UserInfo({
  nameSelector: '.profile__title', 
  infoSelector: '.profile__subtitle',
  avatar: '.profile__avatar'
});

Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
]).then(([userData, cards]) => {
  userAbout.setUserAbout(userData);
  userAbout.setAvatar(userData);
  userAbout.getOwnerId(userData);
  renderList.renderer(cards);
}).catch((err) => {
  console.log(err);
});

const createCard = (item) => {
  const card = new Card(
    item,
    '.template',
    handleCardClick,
    (idCard) => {
      if(card.isLike(item)){
        api.deleteLike(idCard, (data) => {
          item = data; 
          card.likeCard(item);
        }).catch((err) => {
          console.log(err);
        })
      } else {
        api.addLike(idCard, (data) => {
          item = data; 
          card.likeCard(item);
        }).catch((err) => {
          console.log(err);
        })
      }
    },
    (card, idCard) => {
      popupDeleteCard.openPopupDeleteCard(card, idCard);
    },
    userAbout.getOwnerId()
  );
  const cardElement = card.generateCard();
  renderList.addItem(cardElement); 
};

const renderList = new Section({
  renderer: (item) => {
    createCard(item);
}}, '.elements__list');

const editPopupProfile = new PopupWithForm({handlePopupForm: (data) => {
  editPopupProfile.renderLoadText(true, `Сохранение...`);
  api.sendUserInfo(data).then(() => {
    userAbout.setUserAbout(data);
    editPopupProfile.close();
    editPopupProfile.renderLoadText(false, `Сохранение...`);
  })
  .catch((err) => {
    console.log(err);
  })
}}, '.popup_profile');
editPopupProfile.setEventListeners();

const editPopupPlace = new PopupWithForm({handlePopupForm: (data) => {
  editPopupPlace.renderLoadText(true, `Создание...`);
  api.addCard(data).then((res) => {
    const itemData = {
      name: data.popupPlace,
      link: data.popupLink,
      _id: res._id,
      likes: res.likes,
      owner: {_id: res.owner._id},
    };
    createCard(itemData);
    editPopupPlace.close();
    editPopupPlace.renderLoadText(false, `Создание...`);
  })
  .catch((err) => {
    console.log(err);
  })
}}, '.popup_places');
editPopupPlace.setEventListeners();

const updatePopup = new PopupWithForm({handlePopupForm: (data) => {
  updatePopup.renderLoadText(true, `Сохранение...`);
  const linkAvatar = data.popupAvatar;
  api.updateAvatar(linkAvatar).then(() => {
    userAbout.updateAvatar(linkAvatar);
    updatePopup.close();
    updatePopup.renderLoadText(false, `Сохранение...`);
  })
  .catch((err) => {
    console.log(err);
  })
}}, '.popup-upd');
updatePopup.setEventListeners();

const popupDeleteCard = new PopupWithForm({handlePopupForm: (idCard, cardElement) => {
  popupDeleteCard.renderLoadText(true, `Удаление...`);
  api.deleteCard(idCard).then(() => {
    cardElement.remove();
    popupDeleteCard.close();
    popupDeleteCard.renderLoadText(false, `Удаление...`);
  }).catch((err) => {
    console.log(err);
  })
}}, '.popup-sure');
popupDeleteCard.setEventListenersDelete();

const zoomImagePopup = new PopupWithImage('.popup-image');
zoomImagePopup.setEventListeners();

function openProfilePopup(){
  editPopupProfile.open();
  validFormProfile.resetErrors();
  nameInput.value = userAbout.getUserAbout().name;
  jobInput.value = userAbout.getUserAbout().about;
  validFormProfile.toggleButtonState();
}

function openPlacePopup(){
  editPopupPlace.open();
  validFormPlace.resetErrors();
  validFormPlace.toggleButtonState();
}

function openUpdatePopup(){
  updatePopup.open();
  validFormUpdate.resetErrors();
  validFormUpdate.toggleButtonState();
}

function handleCardClick(name, link){
  zoomImagePopup.open({name, link});
}


profileEdit.addEventListener('click', openProfilePopup);
addButtonElement.addEventListener('click', openPlacePopup);
avatarEdit.addEventListener('click', openUpdatePopup);

validFormUpdate.enableValidation();
validFormProfile.enableValidation();
validFormPlace.enableValidation();