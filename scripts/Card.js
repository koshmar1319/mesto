import {popupZoomImage, popupImageDescription, popupImage, openPopup} from './index.js';

export class Card {
  constructor(data, cardSelector){
    this._data = data;
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
  }

  _getTemplate(){
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  generateCard(){
    this._element = this._getTemplate();
    this._setEventListeners();
    this._imageElement = this._element.querySelector('.element__image');
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._headerElement = this._element.querySelector('.element__title');
    this._headerElement.textContent = this._name;
    return this._element;
  }

  _setEventListeners(){
    this._likeButton = this._element.querySelector('.element__link');
    this._likeButton.addEventListener('click', () => {
      this._handleLikeIcon();
    });

    this._deleteButton = this._element.querySelector('.element__delete');
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._imageElement = this._element.querySelector('.element__image');
    this._imageElement.addEventListener('click', () => {
      this._openZoomImage(this._imageElement);
    });
  }

  _handleLikeIcon(){
    this._likeButton.classList.toggle('element__link_active');
  }

  _handleDeleteCard(){
    this._likeButton.closest('.element').remove();
  }

  _openZoomImage = (item) => {
    openPopup(popupImage);
    popupZoomImage.src = item.src;
    popupZoomImage.alt = item.alt;
    popupImageDescription.textContent = item.alt;
  }
}