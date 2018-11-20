import uuid from './uuid-v4'

export const segment = {
  mutate: true,
  persist: true,
  key: 'ajs_user_id',
  stores: ['cookie', 'localStorage'],
  generateId: ({ prefix = 'ajs' }) => [prefix, uuid()].join('-')
}

export default {
  segment
}
