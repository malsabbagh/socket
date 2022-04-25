const baseUrl = window.location.hostname;
const socketUrl = `wss://${baseUrl}/ws`;

var socket = new WebSocket(socketUrl);

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams: URLSearchParams, prop: string) => searchParams.get(prop),
});

let testCase = (params as any).testCase || 'default';

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

// receive a message from the server
socket.addEventListener("message", ({ data }) => {
    const packet = JSON.parse(data.toString());
    switch (packet.type) {
        case "message from server":
            console.log(packet.content);
            break;
    }
});


const defaultTestCase = () => {
    window.addEventListener("beforeunload", () => {
        console.log('beforeunload was called');
        socket.send(JSON.stringify({
            type: "close socket",
            content: ["socket closed"]
        }));
    });

    window.addEventListener("unload", () => {
        console.log('Unload was called');
        if (socket.readyState == WebSocket.OPEN) {
            socket.close();
        }
    });
}

const beforeUnloadTestCase = () => {
    window.addEventListener("beforeunload", () => {
        console.log('beforeunload was called');
        socket.send(JSON.stringify({
            type: "close socket",
            content: ["socket closed"]
        }));
        if (socket.readyState == WebSocket.OPEN) {
            socket.close();
        }
    });

    window.addEventListener("unload", () => {
        console.log('Unload was called');
    });
}


switch (testCase) {
    case 'beforeUnloadSocketClose':
        beforeUnloadTestCase();
        break;
    case 'default':
    default:
        defaultTestCase();
}