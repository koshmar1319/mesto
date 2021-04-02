import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor({handlePopupForm}, popupSelector){
    super(popupSelector);
    this._handlePopupForm = handlePopupForm;
    this._formElement = this._popupSelector.querySelector('.popup__form');
  }

  _getInputValues(){
    this._inputList = this._formElement.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => (this._formValues[input.name] = input.value));
    return this._formValues;
  }

  close(){
    super.close();
    this._formElement.reset();
  }

  setEventListeners(){
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handlePopupForm(this._getInputValues());
      this.close();
    });
  }
}