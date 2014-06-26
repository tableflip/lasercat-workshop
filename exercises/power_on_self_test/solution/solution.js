var five = require('johnny-five')
var board = new five.Board()

board.on('ready', function () {
  var status = new five.Led(13)
  status.on()
})
