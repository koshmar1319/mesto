import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor({handlePopupForm}, popupSelector){
    super(popupSelector);
    this._handlePopupForm = handlePopupForm;
    this._formElement = this._popup.querySelector('.popup__form');
    this._buttonText = this._formElement.querySelector('.popup__btn');
    this._buttonTextDefault = this._formElement.querySelector('.popup__btn').value;
  }

  _getInputValues(){
    this._inputList = this._formElement.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => (this._formValues[input.name] = input.value));
    return this._formValues;
  }

  openPopupDeleteCard(card, idCard){
    super.open();
    this._card = card;
    this._idCard = idCard;
  }

  close(){
    super.close();
    this._formElement.reset();
  }

  setEventListeners(){
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handlePopupForm(this._getInputValues());
    });
  }

  setEventListenersDelete(){
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handlePopupForm(this._idCard, this._card);
    });
  }

  renderLoadText(isLoading, loadText){
    if(isLoading){
      this._buttonText.textContent = loadText;
    } else {
      this._buttonText.textContent = this._buttonTextDefault;
      this.close();
    }
  }
}