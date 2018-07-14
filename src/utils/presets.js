const uuid = require('./uuid-v4')

const segment = {
  stores: ['cookie', 'localStorage'],
  key: 'ajs_user_id',
  generateId: (prefix = 'ajs') => [prefix, uuid()].join('-'),
  mutate: true,
  persist: true
}

module.exports = {
  segment
}
