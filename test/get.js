const test = require('ava')
const id = require('../lib/analytics-id')
const { get } = require('../lib/analytics-id')

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
