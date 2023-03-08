class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    const url = this._baseUrl + `/users/me`;
    return fetch(url, {
      headers: this._headers
    })
    .then(res => {
      return this._getResponce(res)
    });
  }

  getInitialCards() {
    const url = this._baseUrl + `/cards`;
    return fetch(url , {
    headers: this._headers
  })
    .then(res => {
      return this._getResponce(res);
    });
  }

  addCard(popupInputsValue) {
    const url = this._baseUrl + `/cards`;
    return fetch(url, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name:  popupInputsValue['caption-input'],
        link: popupInputsValue['link-input']
      })
    })
    .then(res => {
      return this._getResponce(res)
    });
  }

  deleteCard(id) {
    const url = this._baseUrl + `/cards/${id}`;
    return fetch(url, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      return this._getResponce(res)
    });
  }

  setCardLike(id) {
    const url = this._baseUrl + `/cards/${id}/likes`;
    return fetch(url, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => {
      return this._getResponce(res)
    });
  }

  deleteCardLike(id) {
    const url = this._baseUrl + `/cards/${id}/likes`;
    return fetch(url, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      return this._getResponce(res)
    });
  }

  changeLikeCardStatus(id, isLiked) {
    if(isLiked){
      return this.setCardLike(id)
    } else {
      return this.deleteCardLike(id)
    }
  }

  setUserInfo(popupInputsValue) {
    const url = this._baseUrl + `/users/me`;
    return fetch(url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(popupInputsValue)
    })
    .then(res => {
      return this._getResponce(res)
    });
  }

  setUserAvatar(link) {
    const url = this._baseUrl + `/users/me/avatar`;
    return fetch(url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        "avatar": link
      })
    })
    .then(res => {
      return this._getResponce(res)
    });
  }


}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '34b33043-5140-4391-8d43-660bc14ee8a8',
    'Content-Type': 'application/json'
  }
});
