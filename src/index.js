import getAnalyticsId from './get'
import setAnalyticsId from './set'
import generateId from './utils/uuid-v4'

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

const get = getAnalyticsId
const set = setAnalyticsId

analyticsId.get = getAnalyticsId
analyticsId.set = setAnalyticsId
analyticsId.generate = generateId

export { get, set, generateId }

export default analyticsId
