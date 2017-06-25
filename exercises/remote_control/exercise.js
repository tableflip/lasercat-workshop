var sinon = require('sinon')
var proxyquire = require('proxyquire')
var five = require('../../stubs/five')
var expect = require('chai').expect

var server = require('http').createServer()
server.listen = sinon.stub()
var http = {
  createServer: function() {
    return server
  }
}

var socket = require('socket.io')(server)
sinon.spy(socket, 'on')
var sio = function() {
  return socket
}

var exercise = require('workshopper-exercise')()
var filecheck = require('workshopper-exercise/filecheck')
var execute = require('workshopper-exercise/execute')
var wrappedexec = require('workshopper-wrappedexec')
var path = require('path')
var hardwareFinder = require('../../lib/hardware-finder')

var notifier = {
  notify: function() {}
}

try {
  var Notification = require('node-notifier');
  notifier = new Notification();
} catch(e) {}

// checks that the submission file actually exists
exercise = filecheck(exercise)

// execute the solution and submission in parallel with spawn()
exercise = execute(exercise)

// wrap up the child process in a phantom wrapper that can
// mess with the global environment and inspect execution
exercise = wrappedexec(exercise)

// this actually runs the solution
exercise.addProcessor(function (mode, callback) {
  // includes the solution to run it
  proxyquire(path.join(process.cwd(), exercise.args[0]), {
    'johnny-five': five.spyOn('Led', 'Board', 'Servo'),
    'http': http,
    'socket.io': sio
  })

  setTimeout(function() {
    console.log('Please wait while your solution is tested...')
  }, 1000)

  // need a better way of detecting when we are done..
  setTimeout(function() {
    callback(null)
  }, 1000)
})

// add a processor only for 'verify' calls
exercise.addVerifyProcessor(function (callback) {
  var result, error

  try {
    var io = five.stubs.firmata.singleton

    if (!io) {
      // yikes, board was never created
      return callback(null, false)
    }

    // should have started the server
    expect(server.listen.calledOnce, 'server.listen was never called').to.be.true
    expect(server.listen.getCall(0).args[0], 'server.listen was passed the wrong port').to.equal(9582)

    var client = {
      on: sinon.stub()
    }

    // simulate connection
    socket.emit('connection', client)

    // should have registered listeners
    expect(client.on.callCount).to.equal(2, 'listeners should be registered for x and y events')

    var xListener, yListener

    if(client.on.getCall(0).args[0] == 'x') {
      expect(client.on.getCall(1).args[0]).to.equal('y', 'listeners should be registered for x and y events')

      xListener = client.on.getCall(0).args[1]
      yListener = client.on.getCall(1).args[1]
    } else if(client.on.getCall(0).args[0] == 'y') {
      expect(client.on.getCall(1).args[0]).to.equal('x', 'listeners should be registered for x and y events')

      yListener = client.on.getCall(0).args[1]
      xListener = client.on.getCall(1).args[1]
    } else {
      throw 'listeners should be registered for x and y events'
    }

    // simulate "x" event
    xListener(5)

    var panServo = hardwareFinder(five, 'Servo', 10)
    expect(panServo, 'pan servo expected to be connected to pin 10').to.exist
    expect(panServo.to.callCount, 'pan servo.to was not used').to.equal(1)
    expect(panServo.to.getCall(0).args[0], 'pan servo.to was not used').to.equal(5)

    // simulate "y" event
    yListener(15)

    var tiltServo = hardwareFinder(five, 'Servo', 11)
    expect(tiltServo, 'tilt servo expected to be connected to pin 11').to.exist
    expect(tiltServo.to.callCount, 'tilt servo.to was not used').to.equal(1)
    expect(tiltServo.to.getCall(0).args[0], 'tilt servo.to was not used').to.equal(15)

    result = true
  } catch(e) {
    result = false
    error = e
  }

  try {
    notifier.notify({
        title: 'lasercat-workshop',
        message: 'Remote control ' + (result ? 'passed :)' : 'failed :('),
        appIcon: __dirname + '/../../assets/nodebots.png',
        contentImage: __dirname + '/../../assets/' + (result ? 'happy' : 'sad') + '_cat5.jpg'
    })
  } catch(e) {}

  // needs enough time to show the notification
  setTimeout(function() {
    callback(error, result)
  }, 1000)
})

module.exports = exercise
