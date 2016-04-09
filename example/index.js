var event = require('event')
var domify = require('domify')
require('./style.css')
var template = require('./template.html')
document.body.appendChild(domify(template))
var longtap = require('..')

var el = document.getElementById('demo')
event.bind(el, 'touchstart', longtap(function () {
  console.log('longtap')
}))
