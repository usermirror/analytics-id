const test = require('ava')
const { get } = require('../lib')

test(t => {
  const localStorage = {}
  const id = get({ localStorage })

  t.truthy(id)
  t.is(localStorage.ajs_user_id, id)
})
