const test = require('ava')
const analyticsId = require('../lib/analytics-id')

// test get
test(t => {
  const id = analyticsId()

  t.truthy(id)
})

// test set
test(t => {
  const { cookie } = analyticsId('testemail')

  t.is(cookie, 'ajs_user_id=testemail')
})
