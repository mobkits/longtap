var event = require('event')
var cancelEvents = ['touchmove', 'touchend']

Longtap.threshold = 1000
var timeout

function Longtap(handler, options) {
  options = options || {}
  listener.handler = handler
  var threshold = options.threshold || Longtap.threshold

  return listener

  function listener(e1) {
    if (timeout) return cleanUp()
    if (!e1.touches || e1.touches.length > 1) return
    var context = this
    var args = arguments;
    timeout = setTimeout(done, threshold)

    function done() {
      handler.call(context, args)
    }

    function cleanUp() {
      clearTimeout(timeout)
      timeout = null
      cancelEvents.forEach(function (name) {
        event.unbind(document, name, cleanUp)
      })
    }

    cancelEvents.forEach(function (name) {
      event.bind(document, name, cleanUp)
    })
  }
}

module.exports = Longtap
