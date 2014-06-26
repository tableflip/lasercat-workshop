var proxyquire = require('proxyquire')
var five = require('../../stubs/five')
var expect = require('chai').expect

var exercise = require('workshopper-exercise')()
var filecheck = require('workshopper-exercise/filecheck')
var execute = require('workshopper-exercise/execute')
var wrappedexec = require('workshopper-wrappedexec')
var path = require('path')
var hardwareFinder = require('../../lib/hardware-finder')

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
  proxyquire(path.join(process.cwd(), exercise.args[0]), {'johnny-five': five.spyOn('Led', 'Board', 'Servo')})

  setTimeout(function() {
    console.log('Please wait while your solution is tested...')
  }, 1000)

  // need a better way of detecting when we are done..
  setTimeout(function() {
    callback(null)
  }, 4000)
})

// add a processor only for 'verify' calls
exercise.addVerifyProcessor(function (callback) {
  try {
    var io = five.stubs.firmata.singleton

    if (!io) {
      // yikes, board was never created
      return callback(null, false)
    }

    var board = five.Board.instances[0]
    var laser = hardwareFinder(five, 'Led', 11)
    var panServo = hardwareFinder(five, 'Servo', 9)

    expect(laser, 'laser expected to be connected to pin 11').to.exist
    expect(laser.strobe.called, 'led.strobe was not called').to.be.true
    expect(laser.strobe.getCall(0).args[0], 'led.strobe was not called with 1000').to.equal(1000)

    expect(panServo, 'pan servo expected to be connected to pin 9').to.exist
    expect(panServo.sweep.calledOnce, 'pan servo did not sweep').to.be.true
    expect(panServo.stop.calledOnce, 'pan servo did not stop before moving to expected angle').to.be.true

    expect(board.wait.calledOnce, 'board.wait was not used').to.be.true

    var boardWait = board.wait.getCall(0)

    var panServoStop = panServo.stop.getCall(0)
    var panToLast = panServo.to.getCall(panServo.to.callCount - 1)

    expect(boardWait.calledBefore(panServoStop), 'pan servo unexpectedly stopped before waiting').to.be.true
    expect(boardWait.args[0], 'board did not wait for expected time').to.equal(3000)

    expect(panServoStop.calledBefore(panToLast), 'pan servo did not stop before returning to center').to.be.true
    expect(panToLast.args[0], 'pan servo did not return to center').to.equal(90)

    callback(null, true)
  } catch(e) {
    callback(e, false)
  }
})

module.exports = exercise
