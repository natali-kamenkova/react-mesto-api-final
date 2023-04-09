//import { config } from "../utils/utils.js"
export const config = {
  url: 'https://api.natali.nomoredomains.monster',
  headers: {
    authorization: 'c14fd4d2-b83b-4faf-994c-ea33775685d1',
    "Content-Type": "application/json"
  }
}

export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('jwt'),
        'Content-Type': 'application/json',
      }
    })
      .then(this._checkResponse)

  }

  changeLike(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('jwt'),
        'Content-Type': 'application/json',
      }
    })
      .then(this._checkResponse)

  }


  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('jwt'),
        'Content-Type': 'application/json',
      }
    })
      .then(this._checkResponse)

  }


  removeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('jwt'),
        'Content-Type': 'application/json',
      }
    })
      .then(this._checkResponse)


  }

  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('jwt'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._checkResponse)


  }

  editProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('jwt'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(this._checkResponse)

  }

  editAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('jwt'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: data.avatar

      })
    })
      .then(this._checkResponse)

  }



  getAllInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
  }



}
const api = new Api(config);


export default api;
