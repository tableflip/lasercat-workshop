var five = require('johnny-five')
var board = new five.Board()

board.on('ready', function () {
  var pan = new five.Servo(10)

  board.repl.inject({
    pan: pan
  })

  pan.to(0)

  board.wait(1000, function () {
    pan.to(180)

    board.wait(1000, function () {
      pan.to(90)
    })
  })
})
