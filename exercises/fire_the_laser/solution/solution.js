var five = require('johnny-five')
var board = new five.Board()

board.on('ready', function () {
  var pan = new five.Servo(9)
  var tilt = new five.Servo(10)
  var laser = new five.Led(11)

  board.repl.inject({
    pan: pan,
    tilt: tilt,
    laser: laser
  })

  pan.sweep()
  laser.strobe(500)

  board.wait(3000, function() {
    laser.off()
    pan.stop()
    pan.center()
  })
})
