export function get(opts = {}) {
  const { key, localStorage = {} } = opts

  return localStorage.getItem ? localStorage.getItem(key) : localStorage[key]
}

export function set(opts = {}) {
  const { key, id, localStorage = {}, mutate } = opts
  const storage = mutate ? localStorage : Object.assign({}, localStorage)

  if (storage.setItem) {
    storage.setItem(key, id)
  } else {
    storage[key] = id
  }

  return storage
}

export default {
  get,
  set
}
