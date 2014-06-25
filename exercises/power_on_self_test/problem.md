**Turn on an LED attached to pin 13**

## Writing the code

1. A directory for your answers and `cd` in to it.
2. Get johnny-five from npm: `npm install johnny-five`
3. Add a file for your solution (e.g. 01-power-on-self-test.js)

```js
  var five = require('johnny-five')
  var board = new five.Board()
  board.on('ready', function () {
    // Your solution here!
  })
```

- When the board is ready, create a new `Led` instance.
- Check the docs for how to bind it to a specific pin and turn it on.
- Expose it to the repl, so you can control it from the command line.

**Johnny-five Docs**

- Board - https://github.com/rwaldron/johnny-five/wiki/Board
- Led - https://github.com/rwaldron/johnny-five/wiki/Led#api

## Building the hardware

**DON'T FORGET TO ADD A 330Ω RESISTOR TO YOUR CIRCUIT.**
5v will burn out a standard LED. Yes it looks nice & bright without one, but...

```
           LED     330
 Pin 13 o--->|----/\/\/----o GND
```

**Components**

- `  >| ` - LED - http://node-ardx.org/electronics-primer#led
- `/\/\/` - Resistor - http://node-ardx.org/electronics-primer#resistor

---
