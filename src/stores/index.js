import cookie from './cookie'
import localStorage from './local-storage'

export const get = {
  cookie: cookie.get,
  localStorage: localStorage.get
}

export const set = {
  cookie: cookie.set,
  localStorage: localStorage.set
}

export default { get, set }
