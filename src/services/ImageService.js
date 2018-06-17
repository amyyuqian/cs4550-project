let _singleton = Symbol();
const SHIBA_API = 'https://cors-anywhere.herokuapp.com/http://shibe.online/api/shibes?count='

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
}
