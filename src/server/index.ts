import { createServer } from "http";
import { WebSocket } from "ws";
import express from "express";
import path from "path";

var app = express();

app.get('/', function (req, res) {
  res.sendFile(path.resolve('./dist/client/index.html'));
});

app.get('/embedWebex.html', function (req, res) {
  res.sendFile(path.resolve('./dist/client/embedWebex.html'));
});

const server = createServer(app);

server.listen(process.env.PORT, function () {
  console.log(`App listening port ${process.env.PORT}!`);
});

const wsServer = new WebSocket.Server({ server: server, path: '/ws' });

let connections: number = 0;

wsServer.on("connection", (socket) => {
  function sendClientSocketMessage(socket: WebSocket, connection: number) {
    socket.send(JSON.stringify({
      type: "message from server",
      content: [`Current connections are ${connection} connection`]
    }));
  }

  socket.on("close", () => {
    console.log("socket connection closed")
  })

  let connection = ++connections;
  // send a message to the client
  sendClientSocketMessage(socket, connection);

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
        sendClientSocketMessage(socket, connections);
        console.log(`socket state ${socket.readyState}`);
        if (socket.readyState == WebSocket.OPEN) {
          socket.terminate();
          socket.close();
        }
        break;
    }
  });
});

