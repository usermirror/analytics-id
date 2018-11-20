const getAnalyticsId = require('./get')
const setAnalyticsId = require('./set')
const generateId = require('./utils/uuid-v4')

function analyticsId(opts) {
  if (typeof opts === 'undefined') {
    return generateId()
  }

  if (typeof opts === 'string' || typeof opts === 'number') {
    return setAnalyticsId({ id: opts })
  }

  if (typeof opts === 'object') {
    if (typeof opts.id !== 'undefined' || typeof opts.prefix !== 'undefined') {
      return setAnalyticsId(opts)
    } else {
      return getAnalyticsId(opts)
    }
  } else {
    return getAnalyticsId()
  }
}

analyticsId.get = getAnalyticsId
analyticsId.set = setAnalyticsId

module.exports = analyticsId
