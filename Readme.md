# Longtap

A module to support long tap event, longtap should not be triggered when:

* more than one finger on the screen
* touch event fired during the hold

## Install

    npm i longtap -S

## Example

``` js
var longtap = require('longtap')

el.addEventListener('touchstart', longtap(function(e) {
  console.log('fired')
}), false)
```

## API

### Longtap(handler, [option])

* `handler` is event hanlder for `touchstart` event
* `option.threshold` set the timeout to call the hanlder

_handler is called with the save context and arguments as `touchstart`_

