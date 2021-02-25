const validItems = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_inactive',
  errorClass: '.popup__input-error',
  inputErrorClass: 'popup__input-error',
  activeErrorClass: 'popup__input-error_active',
  profileButton: '.profile__button'
}

const showInputError = (formElement, inputElement, errorMessage, validItems) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(validItems.inputErrorClass);
  errorElement.classList.add(validItems.activeErrorClass);
}

const hideInputError = (formElement, inputElement, validItems) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  
  errorElement.textContent = '';
  errorElement.classList.remove(validItems.inputErrorClass);
  errorElement.classList.remove(validItems.activeErrorClass);
}

const checkInputValidity = (formElement, inputElement, validItems) => {
  const inputValid = inputElement.validity.valid;
  const errorMessage = inputElement.validationMessage;

  if(inputValid){
    hideInputError(formElement, inputElement, validItems);
  } else {
    showInputError(formElement, inputElement, errorMessage, validItems);
  }
}

const setEventListeners = (formElement, validItems) => {
  formElement.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  const inputList = Array.from(formElement.querySelectorAll(validItems.inputSelector));
  const buttonElement = formElement.querySelector(validItems.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', (evt) => {
      checkInputValidity(formElement, inputElement, validItems);
      toggleButtonState(inputList, buttonElement, validItems);
    });
  });

  const buttonList = Array.from(document.querySelectorAll(validItems.profileButton));
  buttonList.forEach((buttonItem) => {
    buttonItem.addEventListener('click', () => {
      toggleButtonState(inputList, buttonElement, validItems);
    });
  });
}

const resetErrors = (popupElement, validItems) => {
  const errorList = Array.from(popupElement.querySelectorAll(validItems.inputSelector));
  errorList.forEach((errorItem) => {
    errorItem.classList.remove(validItems.inputErrorClass);
  });
  const errorTextList = Array.from(popupElement.querySelectorAll(validItems.errorClass));
  errorTextList.forEach((errorTextItem) => {
    errorTextItem.classList.remove(validItems.inputErrorClass);
    errorTextItem.textContent = "";
  });
}

const toggleButtonState = (inputList, buttonElement, validItems) => {
  const notValidElement = inputList.some((inputElement) => !inputElement.validity.valid);
  if(notValidElement){
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(validItems.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(validItems.inactiveButtonClass);
  }
}

const enableValidation = (validItems) => {
  const formList = Array.from(document.querySelectorAll(validItems.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validItems);
  });
}

enableValidation(validItems);