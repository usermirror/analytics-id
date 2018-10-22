const test = require('ava')
const id = require('../lib')
const { get } = require('../lib')

test(t => {
  t.truthy(id())
  t.not(id(), 'null')
})

test(t => {
  const localStorage = {}
  const id = get({ localStorage })

  t.truthy(id)
  t.is(localStorage.ajs_user_id, id)
})
