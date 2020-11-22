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

function profileClickClose(){
  popup.classList.remove('popup_opened');
}

let forms = [...document.querySelectorAll('.popup__form')];

forms.forEach((popupForm) => {
  popupForm.addEventListener('submit', handleFormSubmit),
  popupForm.addEventListener('submit', andleFormSubmit)
})

function handleFormSubmit(event){
  event.preventDefault();
  let nameInput = event.currentTarget.querySelector('.popup__input_name');
  profileTitle.textContent = nameInput.value;
}

function andleFormSubmit(event){
  event.preventDefault();
  let jobInput = event.currentTarget.querySelector('.popup__input_job');
  profileSubTitle.textContent = jobInput.value;
}
