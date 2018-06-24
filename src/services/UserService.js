let _singleton = Symbol();
const BASE_URL = "https://cs4550-aqian-project.herokuapp.com/api/";
const USER_API = "https://cs4550-aqian-project.herokuapp.com/api/user";

export default class UserService {
  constructor(singletonToken) {
    if (_singleton !== singletonToken)
      throw new Error("Cannot instantiate directly.");
  }
  static get instance() {
    if (!this[_singleton]) this[_singleton] = new UserService(_singleton);
    return this[_singleton];
  }

  register(user) {
    return fetch(BASE_URL + 'register', {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json"
      },
      credentials: "same-origin"
    }).then(function (response) {
      if (response.status == 409) {
        return {error: "Username is already taken"};
      } else {
        return response.json();
      }
    })
  }

  login(user) {
    return fetch(BASE_URL + 'login', {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json"
      },
      credentials: "same-origin"
    }).then(function (response) {
      if (response.status == 409) {
        return null;
      } else {
        return response.json();
      }
    })
  }

  updateUser(user, userId) {
    return fetch(USER_API + '/' + userId, {
      method: 'put',
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json"
      },
      credentials: "same-origin"
    }).then(function (response) {
      return response.json();
    })
  }

  profile() {
    return fetch(BASE_URL + 'profile')
      .then(function (response) {
        if (response.status == 409) {
          return null;
        } else {
          return response.json();
        }
      })
  }

  getAllUsers() {
    return fetch(USER_API).then(function (response) {
      return response.json();
    })
  }

  deleteUser(userId) {
    return fetch(USER_API + '/' + userId, {
      method: 'delete'
    })
  }
}
