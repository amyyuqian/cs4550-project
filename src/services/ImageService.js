let _singleton = Symbol();
const SHIBA_API = 'https://cors-anywhere.herokuapp.com/http://shibe.online/api/shibes?count='
const IMG_API = "https://cs4550-aqian-project.herokuapp.com/api/image";
const USER_API = "https://cs4550-aqian-project.herokuapp.com/api/user";
const BASE_URL = "https://cs4550-aqian-project.herokuapp.com/api/";

export default class ImageService {
  constructor(singletonToken) {
    if (_singleton !== singletonToken)
        throw new Error('Cannot instantiate directly.');
  }
  static get instance() {
      if(!this[_singleton])
          this[_singleton] = new ImageService(_singleton);
      return this[_singleton]
  }

  getShibas(num) {
    return fetch(SHIBA_API + num)
      .then(function(response) {
        return response.json();
      })
  }

  getImage(id) {
    return fetch(IMG_API + '/' + id).then(function (response) {
      return response.json();
    })
  }

  createImage(img) {
    return fetch(IMG_API, {
      method: 'post',
      body: JSON.stringify(img),
      headers: {
        "content-type": "application/json"
      },
    }).then(function(response) {
      return response.json();
    })
  }

  favorite(id) {
    return fetch(IMG_API + '/' + id + '/favorite', {
      method: 'post',
      credentials: "same-origin",
      headers: {
        "content-type": "application/json"
      },
    }).then(function (response) {
      return response.json();
    })
  }

  isFavorite(userId, imgId) {
    return fetch(USER_API + '/' + userId + '/image/' + imgId + '/isInFavorites', {
      credentials: "same-origin",
    })
      .then(function(response) {
        return response.json();
      })
  }
}
