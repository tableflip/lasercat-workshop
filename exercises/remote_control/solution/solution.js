var five = require('johnny-five')
var server = require('http').createServer()
var io = require('socket.io')(server)

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

  var laserTimeout

  function fireLaser () {
    laser.on()
    clearTimeout(laserTimeout)
    laserTimeout = setTimeout(function () {
      laser.off()
    }, 500)
  }

  io.on('connection', function (socket) {
    socket.on('x', function (x) {
      fireLaser()
      pan.to(x)
    })

    socket.on('y', function (y) {
      fireLaser()
      tilt.to(y)
    })
  })
})

server.listen(9582)
