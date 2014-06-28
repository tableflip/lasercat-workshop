var five = require('johnny-five')
var board = new five.Board()

board.on('ready', function () {
  var status = new five.Led(13)
  var pan = new five.Servo(9)
  var tilt = new five.Servo(10)
  var laser = new five.Led(11)

  this.repl.inject({
    status: status,
    pan: pan,
    tilt: tilt,
    laser: laser
  })

  status.on()
  pan.sweep()
  laser.strobe(500)

  board.wait(3000, function() {
    laser.off()
    pan.stop()
    pan.center()
  })
})
