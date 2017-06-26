1. Start with a copy the js file you made for the previous exercise, we'll build on it here.
2. Create a new `Led` instance attached to digital pin 12.
3. Expose the Led instance in the repl so you can control it from the command line
4. Use `Led.strobe` with a duration of 500ms
5. Use `Servo.sweep` to pan the servo from left to right
6. After three seconds turn the Led off, stop and center the servo using `Servo.stop` and `Servo.center`

## Circuit diagram

```
                                      .----o Pin 12
                                      |
      Pew pew!      +----------+------'
-- -- -- -- -- -- --|  LASER!  |
                    +----------+------.
                                      |
                                      '----o GND
```

## Hints

* Your funduino has a switch to change the voltage of all pins between 5v and 3.3v - 3.3v is not sufficient to power a servo so ensure it's set to 5v
* To power the servos reliably you will need to use the included power adapter to add extra juice to your Arduino
* The servos in the kit have the following wires:
 * Brown - Ground
 * Orange - Power
 * Yellow - Signal

## Components

- Servo - http://node-ardx.org/electronics-primer#servo

> Takes a timed pulse and converts it into an angular position of the output shaft.

## Johnny-Five docs

- Servo - https://github.com/rwaldron/johnny-five/wiki/Servo#api
