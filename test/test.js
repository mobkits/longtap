/*global describe, it, beforeEach, afterEach*/
var longtap = require('..')
var assert = require('assert')
var Touch = require('touch-simulate')
var event = require('event')

var div
beforeEach(function () {
  div = document.createElement('div')
  div.style.width = '10px'
  div.style.height = '10px'
  document.body.appendChild(div)
})

afterEach(function () {
  div.parentNode.removeChild(div)
})

describe('#longtap', function() {
  it('should not fire when touchmove', function () {
    var fired
    event.bind(div, 'touchstart', longtap(function () {
      fired = true
    }, {threshold: 400}))
    var t = new Touch(div)
    return t.start().moveUp(10).wait(500).then(function () {
      assert.notEqual(fired, true)
    })
  })

  it('should not fire when another touchstart fired', function () {
    var fired
    event.bind(div, 'touchstart', longtap(function () {
      fired = true
    }, {threshold: 400}))
    var t = new Touch(div)
    setTimeout(function () {
      t.start()
    }, 200)
    return t.start().wait(500).then(function () {
      assert.notEqual(fired, true)
    })
  })

  it('should fire after threshold', function () {
    var fired
    event.bind(div, 'touchstart', longtap(function () {
      fired = true
    }, {threshold: 400}))
    var t = new Touch(div)
    return t.start().wait(500).then(function () {
      assert.equal(fired, true)
    })
  })
})
