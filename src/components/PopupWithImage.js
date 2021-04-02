import Popup from "./Popup.js";
import {popupZoomImage, popupImageDescription} from '../index.js';

export default class PopupWithImage extends Popup{
  constructor(data, cardSelector){
    super(cardSelector);
    this._src = data.src;
    this._alt = data.alt;
  }

  open(){
    popupZoomImage.src = this._src;
    popupZoomImage.alt = this._alt;
    popupImageDescription.textContent = this._alt;
    super.open();
    this.setEventListeners();
  }
}