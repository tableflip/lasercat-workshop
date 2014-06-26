Add a servo to spin the platter.

1. Start with a copy the js file you made for the previous exercise, we'll build on it here.
2. Create a new `Servo` instance attached to digital pin 9.
3. Expose the servo instance in the repl so you can control it from the command line
4. Move it to 0 degrees using `servo.to`
5. Use `board.wait` to pause for one second, then move it to 180 degrees
6. Finally after one more second move it to 90 degrees

## Circuit diagram

```
                           .----o Pin 9
            Servo          |
       .--|---------.------'
     -====+====-    |-----------o +5v
       '--|---------'------.
                           |
                           '----o GND
```

## Hints

 * Your ITeaduino has a switch to change the voltage of all pins between 5v and 3.3v - 3.3v is not enough to power a servo so ensure it's set to 5v
 * The servos in the kit have the following wires:
  * Brown - Ground
  * Orange - Power
  * Yellow - Signal
 * To power the servos reliably you will need to use the included power adapter to add extra juice to your Arduino

## Components

- Servo - http://node-ardx.org/electronics-primer#servo

> Takes a timed pulse and converts it into an angular position of the output shaft.

## Johnny-Five docs

- Servo - https://github.com/rwaldron/johnny-five/wiki/Servo#api
