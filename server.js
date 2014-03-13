var WebSocketServer = require('ws').Server
  , http = require('http')
  , express = require('express')
  , app = express()
  , port = process.env.PORT || 5000;

app.use(express.static(__dirname + '/'));

var server = http.createServer(app);
server.listen(port);

console.log('http server listening on %d', port);

var wss = new WebSocketServer({server: server});


console.log('websocket server created');

wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        console.log('received: %s', message);
        //ws.send(message);
         wss.broadcast(message);
    });

    //ws.send(message);
});


wss.broadcast = function(data) {
  for (var i in this.clients)
    this.clients[i].send(data);
};

/*
wss.on('connection', function(ws) {
  ws.on('message', function(message) {
    wss.broadcast('Broadcast message: ' + message);
  });

   ws.on('close', function() {
        console.log('websocket connection close');
        clearInterval(id);
    });
});
*/
