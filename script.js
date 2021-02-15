const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const profilEdit = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const popupCloseProfile = document.querySelector('.popup__close_type_edit-profile');
const popupClosePlace = document.querySelector('.popup__close_type_new-place');

const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');
const popupButton = document.querySelector('.popup__btn');

const popupPlace = document.querySelector('.popup_places');
const addButtonElement = document.querySelector('.profile__button');

const createCard = document.querySelector('.popup__btn_create');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

const inputPlace = document.querySelector('.popup__input_type_place');
const inputLink = document.querySelector('.popup__input_type_link');

const popupImage = document.querySelector('.popup-image');
const popupImageCloseBtn = document.querySelector('.popup__close_type_zoom-image');
const popupZoomImage = document.querySelector('.popup-image__photo');
const popupImageDescription = document.querySelector('.popup-image__descr');

const listContainerElement = document.querySelector('.elements__list');
const templateElement = document.querySelector('.template');

function openEdit(){
  profileClick(popup);
}

function closeEdit(){
  profileClickClose(popup);
  profileClickClose(popupPlace);
  profileClickClose(popupImage);
}

function profileClick(evt){
  evt.classList.add('popup_opened');
}

function profileClickClose(evt){
  evt.classList.remove('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubTitle.textContent;
  inputPlace.value = '';
  inputLink.value = '';
}

let forms = [...document.querySelectorAll('.popup__form')];

forms.forEach((popupForm) => {
  popupForm.addEventListener('submit', titleFormSubmit),
  popupForm.addEventListener('submit', subtitleFormSubmit)
})

function titleFormSubmit(event){
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
}

function subtitleFormSubmit(event){
  event.preventDefault();
  profileSubTitle.textContent = jobInput.value;
}

popupButton.addEventListener('click', () => {
  popup.classList.remove('popup_opened');
});

function renderList() {
  let listItems = initialCards.map(composeItem);
  listContainerElement.append(...listItems);
}

function composeItem(item){
  let newItem = templateElement.content.cloneNode(true);
  let headerElement = newItem.querySelector('.element__title');
  let imageElement = newItem.querySelector('.element__image');
  headerElement.textContent = item.name;
  imageElement.src = item.link;
  imageElement.alt = headerElement.textContent;
  
  newItem.querySelector('.element__link').addEventListener('click', function(evt){
    evt.target.classList.toggle('element__link_active');
  });

  newItem.querySelector('.element__delete').addEventListener('click', function(evt){
    evt.target.closest('.element').remove();
  });

  function openZoomImage(evt){
    popupImage.classList.add('popup_opened');
    popupZoomImage.setAttribute('src', item.link);
    popupZoomImage.setAttribute('alt', item.name);
    popupImageDescription.textContent = item.name;
  }
  imageElement.addEventListener('click', openZoomImage);
  
  return newItem;
}

function bindAddItemListener(){
  profileClick(popupPlace);
}

function addNewItem(evt){
    evt.preventDefault();
    let newItemHTML = composeItem({ link: inputLink.value, name: inputPlace.value });
    listContainerElement.prepend(newItemHTML);
    inputPlace.value = '';
    inputLink.value = '';
    profileClickClose(popupPlace);
}

popupCloseProfile.addEventListener('click', closeEdit);
popupClosePlace.addEventListener('click', closeEdit);
popupImageCloseBtn.addEventListener('click', closeEdit);

profilEdit.addEventListener('click', openEdit);
addButtonElement.addEventListener('click', bindAddItemListener);
createCard.addEventListener('click', addNewItem);

renderList();