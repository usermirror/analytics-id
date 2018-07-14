const getAnalyticsId = require('./get')
const setAnalyticsId = require('./set')

function analyticsId(opts) {
  if (typeof opts === 'string' || typeof opts === 'number') {
    return setAnalyticsId({ id: opts })
  } else if (typeof opts === 'object') {
    if (typeof opts.id !== 'undefined') {
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
