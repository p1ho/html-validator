var tap = require('tap')
var config = require('../../lib/config')

tap.test('config returns expected object as default', async test => {
  var options = {}
  var reqOptions = await config(options)

  tap.equal(reqOptions.qs.out, 'json', 'JSON is default format')
  test.done()
})

tap.test('config returns expected object with inputs', async test => {
  var options = {
    validator: 'http://html5.validator.nu',
    url: 'https://www.github.com'
  }
  var reqOptions = await config(options)

  tap.equal(reqOptions.qs.doc, options.url, 'Uri is correct')
  tap.equal(reqOptions.uri, options.validator, 'Uri is correct')
  test.done()
})

tap.test('config returns expected object with input from data', async test => {
  var options = {
    data: 'http://html5.validator.nu'
  }
  var reqOptions = await config(options)

  tap.equal(reqOptions.body, options.data, 'Data is correct')
  tap.equal(reqOptions.method, 'POST', 'Method is POST')
  tap.ok(reqOptions.headers, 'Headers are set')
  test.done()
})

tap.test('config uses passed in headers', async test => {
  var headers = {
    foo: 'bar',
    'User-Agent': 'something'
  }
  var options = {
    headers
  }
  var reqOptions = await config(options)

  tap.same(reqOptions.headers, headers, 'headers are the same')
  test.done()
})

tap.test('users defined headers takes prescient', async test => {
  var headers = {
    foo: 'bar',
    'User-Agent': 'something',
    'Content-Type': 'json'
  }
  var options = {
    headers,
    data: 'http://html5.validator.nu'
  }
  var reqOptions = await config(options)

  tap.same(reqOptions.headers, headers, 'user headers take prescient')
  test.done()
})

tap.test('isLocal adds data to options', async test => {
  var options = {
    url: 'http://html5.validator.nu',
    isLocal: true
  }
  var reqOptions = await config(options)

  tap.equal(reqOptions.method, 'POST', 'Method is POST')
  tap.ok(reqOptions.body, 'Body is set')
  test.done()
})
