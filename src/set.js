const Log = require('./utils/log')
const presets = require('./utils/presets')
const { set: storeSetters } = require('./stores')

module.exports = function set(opts = {}) {
  let {
    id,
    debug,
    preset = 'segment',
    cookie,
    localStorage,
    domain,
    prefix
  } = opts
  let log = Log({ debug })

  if (!presets[preset]) {
    // TODO: notify unknown preset
    preset = 'segment'
  }

  const { generateId, key, stores, mutate } = Object.assign(
    {},
    {
      ...presets[preset],
      ...opts // use options to override
    }
  )

  if (!id) {
    id = generateId({ prefix })
    log(`set: created new id {id: "${id}"}`)
  } else {
    log(`set: using {id: "${id}"}`)
  }

  let result

  if (!localStorage) {
    try {
      localStorage = window.localStorage
    } catch (err) {
      // silence window error
    }
  }

  try {
    result = storeId({
      debug,
      key,
      id,
      stores,
      mutate,
      cookie,
      localStorage,
      domain
    })
    result.status = 'success'
  } catch (error) {
    log(`set: error`, error)
    result = {
      status: 'error',
      error
    }
  }

  return result
}

function storeId(opts = {}) {
  const { debug, key, id, stores, mutate, cookie, localStorage, domain } = opts
  const result = {}
  const log = Log({ debug })

  for (const store of stores) {
    try {
      const storeSet = storeSetters[store]
      const value = storeSet({ key, id, mutate, cookie, localStorage, domain })

      if (value) {
        log(`set.${store}: success {id: "${id}"}`)
        result[store] = value
      } else {
        log(`set.${store}: fail {id: "${id}"}`)
      }
    } catch (err) {
      // TODO: Handle unknown error trying to store id
      log(`set.${store}: fail {id: "${id}"}`)
      console.error(err)
    }
  }

  return result
}
