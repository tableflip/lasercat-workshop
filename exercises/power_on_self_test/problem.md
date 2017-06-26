Turn on an LED attached to pin 13

1. Create a directory for your answers and `cd` in to it.
2. Get johnny-five from npm: `npm install johnny-five`
3. Add a file for your solution (e.g. 01-power-on-self-test.js)
4. When the board is ready, create a new `Led` instance.
5. Check the docs for how to bind it to a specific pin and turn it on.
6. Expose it to the repl, so you can control it from the command line.

## Boilerplate

You may copy and paste the following to make getting started a little easier:

```js
  var five = require('johnny-five')
  var board = new five.Board()
  board.on('ready', function () {
    // Your solution here!
  })
```

## Building the hardware

The Arduino has a built in LED and a resistor attached to pin 13 so no hardware
is required other than the Arduino itself and a USB cable.

## Hints

 * Your kit includes an Arudino-compatible funduino board.  Attach this to your computer using the included USB cable.
 * You will need to install the StandardFirmata sketch from the Arduino IDE before Johnny-Five can talk to it.

## Components

- LED - http://node-ardx.org/electronics-primer#led

## Johnny-Five docs

- Board - https://github.com/rwaldron/johnny-five/wiki/Board
- LED - https://github.com/rwaldron/johnny-five/wiki/Led#api
