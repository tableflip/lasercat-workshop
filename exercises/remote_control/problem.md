1. Open a http server listening on port 9582
2. Use `socket.io` to listen for "connection" events via the http server
3. When a "connection" event is received, the first argument will be an `EventEmitter` - set up handlers for "x" and "y" events emitted by the client
4. When an "x" or "y" event is received, the laser should be turned on for 500ms and the first argument written to the pan (x) or tilt (y) servo

## Hints

* To open an http server, use the http module

## Docs

- http - http://nodejs.org/api/http.html
- socket.io - http://socket.io
