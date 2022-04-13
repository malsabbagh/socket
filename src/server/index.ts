import { WebSocketServer } from "ws";
import express from "express";
import path from "path";

const wsServer = new WebSocketServer({ port: 4514 });

let connections: number = 0;

wsServer.on("connection", (socket) => {
  let connection = ++connections;
  // send a message to the client
  socket.send(JSON.stringify({
    type: "message from server",
    content: [ `Current connections are ${connection} connection`]
  }));

  // receive a message from the client
  socket.on("message", (data) => {
    const packet = JSON.parse(data.toString());

    switch (packet.type) {
      case "message from client":
        console.log(packet.content);
        break;
      case "close socket":
        console.log('disconnected');
        console.log(packet.content);
        --connections;
        break;
    }
  });
});

var app = express()

app.get('/', function (req, res) {
  res.sendFile(path.resolve('./dist/client/index.html'));
})

app.listen(3000, function () {
  console.log('App listening port 3000!')
})
