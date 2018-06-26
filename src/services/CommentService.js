let _singleton = Symbol();
const BASE_URL = "https://cs4550-aqian-project.herokuapp.com/api/";
const IMG_API = "https://cs4550-aqian-project.herokuapp.com/api/image";
const COM_API = "https://cs4550-aqian-project.herokuapp.com/api/comment";

export default class CommentService {
  constructor(singletonToken) {
    if (_singleton !== singletonToken)
      throw new Error("Cannot instantiate directly.");
  }
  static get instance() {
    if (!this[_singleton]) this[_singleton] = new CommentService(_singleton);
    return this[_singleton];
  }

  createComment(id, body) {
    return fetch(IMG_API + '/' + id + '/comment', {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/json"
      },
    }).then(function(response) {
      return response.json();
    })
  }
  
  deleteComment(id) {
    return fetch(COM_API + '/' + id, {
      method: 'delete'
    })
  }

  getCommentsForImage(id) {
    return fetch(IMG_API + '/' + id + '/comment').then(function(response) {
      return response.json();
    })
  }
}