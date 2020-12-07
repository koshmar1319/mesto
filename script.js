let profilEdit = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close');

let profileTitle = document.querySelector('.profile__title');
let profileSubTitle = document.querySelector('.profile__subtitle');
let popupButton = document.querySelector('.popup__btn');

profilEdit.addEventListener('click', profileClick);
popupClose.addEventListener('click', profileClickClose);

function profileClick(){
  popup.classList.add('popup_opened');
}

let forms = [...document.querySelectorAll('.popup__form')];

forms.forEach((popupForm) => {
  popupForm.addEventListener('submit', titleFormSubmit),
  popupForm.addEventListener('submit', subtitleFormSubmit)
})

function titleFormSubmit(event){
  event.preventDefault();
  let nameInput = event.currentTarget.querySelector('.popup__input_type_name');
  profileTitle.textContent = nameInput.value;
}

function subtitleFormSubmit(event){
  event.preventDefault();
  let jobInput = event.currentTarget.querySelector('.popup__input_type_job');
  profileSubTitle.textContent = jobInput.value;
}

function profileClickClose(){
  popup.classList.remove('popup_opened');
  let nameInput = document.querySelector('.popup__input_type_name');
  let jobInput = document.querySelector('.popup__input_type_job');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubTitle.textContent;
}

popupButton.addEventListener('click', profileClickClose => {
  popup.classList.remove('popup_opened');
});




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

const listContainerElement = document.querySelector('.elements__list');

function renderList() {
  let newHTML = '';

  newHTML = initialCards.map(function(item) {
    return `<li class="element">
              <img src="images/grid-karachaevsk.png" alt="Изображение старой церкви" class="element__image">
              <div class="element__block">
                <h2 class="element__title">${item.name}</h2>
                <button class="element__link" type="button">
                  <img src="images/like.svg" alt="Изображение сердца" class="element__icon">
                </button>
              </div>
            </li>`
  }).join('');
  
  listContainerElement.insertAdjacentHTML('afterbegin', newHTML);
}

renderList();