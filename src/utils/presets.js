const uuid = require('./uuid-v4')

const segment = {
  mutate: true,
  persist: true,
  key: 'ajs_user_id',
  stores: ['cookie', 'localStorage'],
  generateId: ({ prefix = 'ajs' }) => [prefix, uuid()].join('-')
}

module.exports = {
  segment
}
