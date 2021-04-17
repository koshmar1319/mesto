const showErrorMessage = (res) => {
  if(res.ok){
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export default class Api{
  constructor(options){
    this._token = options.token;
    this._groupID = options.groupID;
  }

  getUserInfo(){
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupID}/users/me`, {
      method: "GET",
      headers: {
        authorization: this._token
      }
    })
    .then(showErrorMessage)
    .catch((err) => {
      console.log(err);
    })
  }

  sendUserInfo(data){
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupID}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(showErrorMessage)
    .catch((err) => {
      console.log(err);
    })
  }

  getInitialCards(){
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupID}/cards`, {
      method: "GET",
      headers: {
        authorization: this._token
      }
    })
    .then(showErrorMessage)
    .catch((err) => {
      console.log(err);
    })
  }

  addCard(cardData){
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupID}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: cardData.popupPlace,
        link: cardData.popupLink
      })
    })
    .then(showErrorMessage)
    .catch((err) => {
      console.log(err);
    })
  }

  deleteCard(idCard){
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupID}/cards/${idCard}`, {
      method: "DELETE",
      headers: {
        authorization: this._token
      }
    })
    .then(showErrorMessage)
    .catch((err) => {
      console.log(err);
    })
  }

  addLike(idCard, handleLikeCard){
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupID}/cards/likes/${idCard}`, {
      method: "PUT",
      headers: {
        authorization: this._token
      }
    })
    .then(showErrorMessage)
    .then((res) => {
      handleLikeCard(res)
      return res
    })
    .catch((err) => {
      console.log(err);
    });
  }

  deleteLike(idCard, handleDisLikeCard){
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupID}/cards/likes/${idCard}`, {
      method: "DELETE",
      headers: {
        authorization: this._token
      }
    })
    .then(showErrorMessage)
    .then((res) => {
      handleDisLikeCard(res)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  updateAvatar(popupAvatar){
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupID}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        avatar: popupAvatar
      })
    })
    .then(showErrorMessage)
    .catch((err) => {
      console.log(err);
    })
  }
}