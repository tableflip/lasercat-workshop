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
  proxyquire(path.join(process.cwd(), exercise.args[0]), {'johnny-five': five.spyOn('Board', 'Servo')})

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
    var servo = hardwareFinder(five, 'Servo', 9)

    expect(servo, 'servo expected to be connected to pin 9').to.exist
    expect(servo.to.callCount, 'servo.to was not used').to.equal(3)
    expect(board.wait.calledTwice, 'board.wait was not used').to.be.true

    var wait0 = board.wait.getCall(0)
    var wait1 = board.wait.getCall(1)
    var to0 = servo.to.getCall(0)
    var to1 = servo.to.getCall(1)
    var to2 = servo.to.getCall(2)

    expect(to0.calledBefore(wait0), 'servo moved to 0 before waiting').to.be.true
    expect(to1.calledBefore(wait1), 'servo moved to 180 before waiting').to.be.true
    expect(wait0.args[0], 'board did not wait for expected time').to.equal(1000)
    expect(wait1.args[0], 'board did not wait for expected time').to.equal(1000)
    expect(to0.args[0], 'servo did not move to 0').to.equal(0)
    expect(to1.args[0], 'servo did not move to 180').to.equal(180)
    expect(to2.args[0], 'servo did not move to 90').to.equal(90)

    callback(null, true)
  } catch(e) {
    callback(e, false)
  }
})

module.exports = exercise
