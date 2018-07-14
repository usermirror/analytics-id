const test = require('ava')
const { set } = require('../lib')

test(t => {
  const { cookie, localStorage } = set({ id: 'a' })

  t.is(cookie, `ajs_user_id=a`)
  t.is(localStorage.ajs_user_id, `a`)
})
