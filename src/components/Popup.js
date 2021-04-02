export default class Popup{
  constructor(popupSelector){
    this._popupSelector = popupSelector;
  }

  open(){
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {
      this._handleButtonEsc(evt);
    });
  }

  close(){
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => {
      this._handleButtonEsc(evt);
    });
  }

  _handleButtonEsc(evt){
    if(evt.key === 'Escape'){
      this.close();
    }
  }

  setEventListeners(){
    const popups = document.querySelectorAll('.popup');
    popups.forEach((popup) => {
      popup.addEventListener('click', (evt) => {
        if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')){
          this.close();
        }
      })
    });
  }
}