const Log = require('./utils/log')
const presets = require('./utils/presets')
const { get: storeGetters } = require('./stores')
const set = require('./set')

module.exports = function get(opts = {}) {
  let { debug, preset = 'segment', env = '', cookie, localStorage, prefix } = opts
  let log = Log({ debug })

  if (!presets[preset]) {
    // TODO: notify unknown preset
    preset = 'segment'
  }

  const { generateId, key, stores, persist } = presets[preset]

  if (isBrowser({ env })) {
    if (!localStorage) {
      try {
        localStorage = window.localStorage
      } catch (err) {
        // silence error
      }
    }

    if (!cookie) {
      try {
        cookie = document.cookie
      } catch (err) {
        // silence error
      }
    }

    const browserId = getBrowserId({
      debug,
      stores,
      key,
      cookie,
      localStorage
    })

    if (browserId) {
      log(`get: found browser id {id: "${browserId}"}`)
      return browserId
    }
  } else {
    // check for req
  }

  const newId = generateId({ prefix })

  if (persist) {
    log(`get: persisting new id {id: "${newId}"}`)

    set({
      debug,
      key,
      id: newId,
      // pass references directly
      cookie: opts.cookie,
      localStorage: opts.localStorage
    })
  }

  return newId
}

function isBrowser(opts = {}) {
  const { env } = opts

  return env === 'browser' || typeof window !== 'undefined'
}

function getBrowserId({ debug, stores, key, cookie, localStorage }) {
  const log = Log({ debug })

  for (const store of stores) {
    const storeGet = storeGetters[store]
    const value = storeGet({ key, cookie, localStorage })

    if (value) {
      log(`get.browser: hit {store: "${store}", key: "${key}"}`)
      return value
    } else {
      log(`get.browser: miss {store: "${store}", key: "${key}"}`)
    }
  }

  return ''
}
