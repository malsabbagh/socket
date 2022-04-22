const baseUrl = window.location.hostname;
const socketUrl = `wss://${baseUrl}/ws`;

var socket = new WebSocket(socketUrl);

socket.onclose = (e) => {
    console.log("socket connection closed");
};

socket.addEventListener("open", () => {
    // send a message to the server
    socket.send(JSON.stringify({
        type: "message from client",
        content: ["socket request"]
    }));
});

window.addEventListener("beforeunload", () => {
    socket.send(JSON.stringify({
        type: "close socket",
        content: ["socket closed"]
    }));
});

window.addEventListener("unload", () => {
    if (socket.readyState == WebSocket.OPEN) {
        socket.close();
    }
});

// receive a message from the server
socket.addEventListener("message", ({ data }) => {
    const packet = JSON.parse(data.toString());

    switch (packet.type) {
        case "message from server":
            console.log(packet.content);
            break;
    }
});
