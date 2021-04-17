export default class UserInfo{
  constructor({nameSelector, infoSelector, avatar}){
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
    this._avatar = document.querySelector(avatar);
  }

  getUserAbout(){
    const userInfo = {name: this._name.textContent, about: this._info.textContent};
    return userInfo;
  }

  setUserAbout(formData){
    this._name.textContent = formData.name;
    this._info.textContent = formData.about;
    this._userOwnerId = formData._id;
  }

  getOwnerId(){
    return this._userOwnerId;
  }

  setAvatar(link){
    this._avatar.src = link.avatar;
  }

  updateAvatar(link){
    this._avatar.src = link;
  }
}