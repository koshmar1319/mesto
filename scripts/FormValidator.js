export class FormValidator{
  constructor(validItems, formElement){
    this._form = formElement;
    this._input = validItems.inputSelector;
    this._submitBtn = validItems.submitButtonSelector;
    this._inactiveBtn = validItems.inactiveButtonClass;
    this._errorText = validItems.errorClass;
    this._inputErrorText = validItems.inputErrorClass;
    this._activeErrorText = validItems.activeErrorClass;
    this._profileBtn = validItems.profileButton;
  }

  enableValidation(){
    this._setEventListeners();
  }

  _showInputError(inputElement, errorMessage){
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
  
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._inputErrorText);
    errorElement.classList.add(this._activeErrorText);
  }
  
  _hideInputError(inputElement){
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    
    errorElement.textContent = '';
    errorElement.classList.remove(this._inputErrorText);
    errorElement.classList.remove(this._activeErrorText);
  }
  
  _checkInputValidity(inputElement){
    const inputValid = inputElement.validity.valid;
    const errorMessage = inputElement.validationMessage;
  
    if(inputValid){
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, errorMessage);
    }
  }

  _setEventListeners(){
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._inputList = Array.from(this._form.querySelectorAll(this._input));
    this._buttonElement = this._form.querySelector(this._submitBtn);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputElement);
      });
    });
  
    const buttonList = Array.from(document.querySelectorAll(this._profileBtn));
    buttonList.forEach((buttonItem) => {
      buttonItem.addEventListener('click', () => {
        this._toggleButtonState(buttonItem);
      });
    });

    this._form.addEventListener('reset', () => {
      this.resetErrors();
    });
  }

  resetErrors(){
    const errorList = Array.from(this._form.querySelectorAll(this._input));
    errorList.forEach((errorItem) => {
      errorItem.classList.remove(this._inputErrorText);
    });
    const errorTextList = Array.from(this._form.querySelectorAll(this._errorText));
    errorTextList.forEach((errorTextItem) => {
      errorTextItem.classList.remove(this._inputErrorText);
      errorTextItem.textContent = "";
    });
  }

  _toggleButtonState(){
    const notValidElement = this._inputList.some((inputElement) => !inputElement.validity.valid);
    if(notValidElement){
      this._buttonElement.setAttribute('disabled', true);
      this._buttonElement.classList.add(this._inactiveBtn);
    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._inactiveBtn);
    }
  }
}