# lasercat workshop [![Build Status](https://travis-ci.org/tableflip/lasercat-workshop.svg?branch=master)](https://travis-ci.org/tableflip/lasercat-workshop) [![Dependency Status](https://david-dm.org/tableflip/lasercat-workshop.svg)](https://david-dm.org/tableflip/lasercat-workshop)

**Cats & Lasers & [johnny-five][2]**

A step by step guide to building your own internet controllable laser turret and cat dazzler...

```shell
 npm install -g lasercat-workshop
```

[Fun is guaranteed...](https://storify.com/gorhgorh/lxjs-catbot)

![lasercat](https://cloud.githubusercontent.com/assets/58871/3391010/aa2240de-fca5-11e3-8015-1f0f54acab33.jpg)
---

[johnny-five][2] is a node api for communicating with Arduino boards.

**You _don't_ need an Arduino for this workshop.**

The workshop will pose a challenge, and will test your code.
The low level code to talk to the Arduino is stubbed out.

**You _will_ be writing working, executable johnny-five code.**

Each of your solutions can be run directly as a `node` program.
Wire up an Arduino, connect the USB and you can see your solution run for real.

## The lasercat turret

Here's what you're going to build.  Amazing, right?

![lasercat](https://raw.githubusercontent.com/tableflip/lasercat-workshop/master/assets/lasercat.jpg)

### Assembly instructions

Follow the build instruction [here](https://catsandsolenoids.eu/catbot/v4/)

### Coding fun

1. Power On Self Test - LED. Ensure everything is working
2.  Spin Up - Turn the platter with a servo.
3.  Pan & Tilt - Become master of the horizontal and the vertical.
4.  Fire the Laser - WARNING: May attract cats.
5.  Remote control - Cats over IP.

```
           \`*-.
            )  _`-.
           .  : `. .
           : _   '  \
           ; *` _.   `*-._
           `-.-'          `-.
             ;       `       `.
             :.       .        \
             . \  .   :   .-'   .
             '  `+.;  ;  '      :
             :  '  |    ;       ;-.
             ; '   : :`-:     _.`* ;
           .*' /  .*' ; .*`- +'  `*'
  *        `*-*   `*-*  `*-*'
```

---

<a href="http://nodebots.io">
  <img src="http://nodebots.io/img/nodebot.png" width="175">
</a>

Built by robots and:
- [Cats and solenoids](https://catsandsolenoids.eu/)
- [@Nodebots of London](http://www.meetup.com/NodeBots-of-London)

Made with <3 and lasers for [LXJS 2014](http://2014.lxjs.org/)

[1]: http://nodeschool.io/
[2]: https://github.com/rwaldron/johnny-five
