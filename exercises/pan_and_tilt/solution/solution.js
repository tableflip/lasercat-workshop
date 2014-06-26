var five = require('johnny-five')
var board = new five.Board()

board.on('ready', function () {
  var status = new five.Led(13)
  var pan = new five.Servo(9)
  var tilt = new five.Servo(10)

  this.repl.inject({
    status: status,
    pan: pan,
    tilt: tilt
  })

  status.on()
  pan.sweep()
  tilt.sweep()

  board.wait(3000, function () {
    pan.stop()
    pan.center()

    tilt.stop()
    tilt.center()
  })
})
