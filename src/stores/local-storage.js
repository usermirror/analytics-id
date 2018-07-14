function get(opts = {}) {
  const { key, localStorage = {} } = opts

  return localStorage.getItem ? localStorage.getItem(key) : localStorage[key]
}

function set(opts = {}) {
  const { key, id, localStorage = {}, mutate } = opts
  const storage = mutate ? localStorage : Object.assign({}, localStorage)

  if (storage.setItem) {
    storage.setItem(key, id)
  } else {
    storage[key] = id
  }

  return storage
}

module.exports = {
  get,
  set
}
