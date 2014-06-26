Make a servo wave at you for three seconds, stop, and return to center

1. Start with a copy the js file you made for the previous exercise, we'll build on it here.
2. Ensure that the pan servo in the base of the cat amuser is attached to pin 9
2. Create a second `Servo` for tilting (e.g. the servo in the vertical column of the cat amuser) attached to pin 10
3. Use `servo.sweep` to rotate both servos between 0˚ and 180˚.
4. Use `board.wait` to schedule a 'reset' callback after three seconds.
5. The 'reset' callback should `stop` and `center` both servos.
6. Check the docs to see how to bring it back into line.

## Circuit diagram

```
        Servo                 Servo
        .---.                 .---.
        | | |                 | | |
      -===+===-             -===+===-
        | | |                 | | |
        |   |                 |   |
        '---'                 '---'
        | | |                 | | |
        | | |                 | | |
        | | '--o Pin 9        | | '--o Pin 10
        | |                   / |
        | '-------------o----|--'
        |                \    \
        '------o----------|----'
               |         /
               o GND    |
                        o  +5v
```

## Components

- Servo - http://node-ardx.org/electronics-primer#servo

> Takes a timed pulse and converts it into an angular position of the output shaft.

## Johnny-Five docs

- Servo - https://github.com/rwaldron/johnny-five/wiki/Servo#api
- Board - https://github.com/rwaldron/johnny-five/wiki/Board#api
