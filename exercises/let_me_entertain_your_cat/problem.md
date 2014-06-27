Write a web page to connect to the laser server's web socket and move the laser

1. Start the solution to the previous problem with `node path_to_your_solution.js`
2. Write a page that contains a block level element such as a div
3. The div should listen for mousemove events and translate them into x and y coordinates with the value range 0-180
4. A web socket connection should be made to the same host/port as the web server
4. x and y events should be emitted on the client's connection to the server

## Hints

* You can load JQuery and Socket.io with the following snippet:

```
  <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
  <script src="http://localhost:9582/socket.io/socket.io.js"></script>
```

* You can connect to the websocket with the following:

```
  var socket = io("http://localhost:9582")
```

* This function will map a value from one range to another

```
  function map(value, fromLow, fromHigh, toLow, toHigh) {
    return (value - fromLow) * (toHigh - toLow) / (fromHigh - fromLow) + toLow
  }
```

* e.g Say your div was 500px on an edge, you might do:

```
  socket.emit("x", map(x, 0, 500, 0, 180))
```

## Docs

- socket.io - http://socket.io
- JQuery mousemove - http://api.jquery.com/mousemove
