const cookie = require('./cookie')
const localStorage = require('./local-storage')

module.exports = {
  get: {
    cookie: cookie.get,
    localStorage: localStorage.get
  },
  set: {
    cookie: cookie.set,
    localStorage: localStorage.set
  }
}
