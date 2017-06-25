var five = require('johnny-five')
var board = new five.Board()

board.on('ready', function () {
  var pan = new five.Servo(10)
  var tilt = new five.Servo(11)

  board.repl.inject({
    pan: pan,
    tilt: tilt
  })

  pan.sweep()
  tilt.sweep()

  board.wait(3000, function () {
    pan.stop()
    pan.center()

    tilt.stop()
    tilt.center()
  })
})
