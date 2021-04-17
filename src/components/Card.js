export class Card {
  constructor(data, cardSelector, handleCardClick, handleLikeCard, handleDeleteCard, userOwnerId){
    this._data = data;
    this._cardSelector = cardSelector;
    this._link = data.link;
    this._name = data.name;
    this._userId = data.owner._id;
    this._idCard = data._id;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleLikeCard = handleLikeCard;
    this._handleDeleteCard = handleDeleteCard;
    this._userOwnerId = userOwnerId;
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

    this._likeCount = this._element.querySelector('.element__count');
    this._likeCount.textContent = this._likes.length;

    if(this._userId === this._userOwnerId){
      this._deleteButton.classList.remove('element__delete_inactive');
      this._deleteButton.removeAttribute('disabled');
    }

    if(this.isLike(this._data)){
      this._likeButton.classList.toggle('element__link_active');
    }
    
    return this._element;
  }

  isLike(data){
    return data.likes.some((like) => {
      return like._id === this._userOwnerId;
    });
  }

  _setEventListeners(){
    this._likeButton = this._element.querySelector('.element__link');
    this._likeButton.addEventListener('click', () => {
      this._handleLikeIcon();
    });

    this._deleteButton = this._element.querySelector('.element__delete');
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteCard(this._element, this._idCard);
    });

    this._imageElement = this._element.querySelector('.element__image');
    this._imageElement.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  likeCard(data){
    this._likeCount.textContent = data.likes.length;
    this._likeButton.classList.toggle('element__link_active');
  }

  _handleLikeIcon(){
    if(!this._likeButton.classList.contains('element__link_active')){
      this._handleLikeCard(this._idCard);
    } else {
      this._handleLikeCard(this._idCard);
    }
  }
}