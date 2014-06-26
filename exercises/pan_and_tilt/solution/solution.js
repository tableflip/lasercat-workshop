var five = require('johnny-five')
var board = new five.Board()

board.on('ready', function () {
  var led = new five.Led(13)
  var servoX = new five.Servo(9)
  var servoY = new five.Servo(7)

  led.on()

  this.repl.inject({
    led: led,
    x: servoX,
    y: servoY
  })
})
