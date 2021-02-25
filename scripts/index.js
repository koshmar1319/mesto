const container = document.querySelector('.container');

const profileEdit = document.querySelector('.profile__button_edit');
const popupProfile = document.querySelector('.popup_profile');
const popupPlace = document.querySelector('.popup_places');
const popupImage = document.querySelector('.popup-image');

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

const listContainerElement = document.querySelector('.elements__list');
const templateElement = document.querySelector('.template');

const formProfile = document.querySelector('.popup__form_profile');
const formPlace = document.querySelector('.popup__form_places');



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
  resetErrors(popupProfile, validItems);
}

function handleProfilePopup(evt){
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubTitle.textContent = jobInput.value;
  closePopup(popupProfile);
}

function openPlacePopup(){
  formPlace.reset();
  openPopup(popupPlace);
  resetErrors(popupPlace, validItems);
}

function handlePlacePopup(evt){
  evt.preventDefault();
  addNewItem();
  closePopup(popupPlace);
}

function renderList() {
  const listItems = initialCards.map(composeItem);
  listContainerElement.append(...listItems);
}

function addNewItem(){
  const newItemHTML = composeItem({ link: inputLink.value, name: inputPlace.value });
  listContainerElement.prepend(newItemHTML);
}

function composeItem(item){
  const newItem = templateElement.content.cloneNode(true);
  const headerElement = newItem.querySelector('.element__title');
  const imageElement = newItem.querySelector('.element__image');

  const likeButton = newItem.querySelector('.element__link');
  const deleteButton = newItem.querySelector('.element__delete');

  headerElement.textContent = item.name;
  imageElement.src = item.link;
  imageElement.alt = headerElement.textContent;
  
  likeButton.addEventListener('click', handleLikeIcon);
  deleteButton.addEventListener('click', handleDeleteCard);
  imageElement.addEventListener('click', () => openZoomImage(item));
  
  return newItem;
}

function handleLikeIcon(evt){
  evt.target.classList.toggle('element__link_active');
}

function handleDeleteCard(evt){
  evt.target.closest('.element').remove();
}

function openZoomImage(item){
  openPopup(popupImage);
  popupZoomImage.src = item.link;
  popupZoomImage.alt = item.name;
  popupImageDescription.textContent = item.name;
}

function handleButtonEsc(evt){
  if(evt.key === 'Escape'){
    closePopup();
  }
}

container.addEventListener('click', (evt) => {
  if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')){
    closePopup();
  }
});

popupCloseProfile.addEventListener('click', closePopup);
popupClosePlace.addEventListener('click', closePopup);
popupImageCloseBtn.addEventListener('click', closePopup);

profileEdit.addEventListener('click', openProfilePopup);
formProfile.addEventListener('submit', handleProfilePopup);

addButtonElement.addEventListener('click', openPlacePopup);
formPlace.addEventListener('submit', handlePlacePopup);

renderList();