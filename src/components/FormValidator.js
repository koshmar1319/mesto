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
        this.toggleButtonState(this._buttonElement);
      });
    });
  }

  resetErrors(){
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  toggleButtonState(){
    const notValidElement = this._inputList.some((inputElement) => !inputElement.validity.valid);
    if(notValidElement){
      this._buttonElement.setAttribute('disabled', 'disabled');
      this._buttonElement.classList.add(this._inactiveBtn);
    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._inactiveBtn);
    }
  }
}