const http = require("http");
const app = require("./app.js");
const SocketController = require("./SocketController/index.js");

const server = http.createServer(app);

const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }

    return false;
};

const port = normalizePort(process.env.PORT || "5000");

app.set("port", port);

const errorHandler = (err) => {
    if (err.syscall !== "listen") {
        throw err;
    }

    const address = server.address();
    const bind = typeof address === "string" ? `pipe ${address}` : `port: ${port}`;

    switch (err.code) {
        case "EACCES":
            console.error(`${bind} requires elevated privileges.`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(`${bind} is already in use.`);
            process.exit(1);
            break;
        default:
            throw err;
    }
};

server.on("error", errorHandler);

server.on("listening", () => {
    const address = server.address();
    const bind = typeof address === "string" ? `pipe ${address}` : `port ${port}`;

    console.log(`Listening on ${bind}`);
});

server.listen(port);
const io = require("socket.io")(server, {
    "cors": {
        "origin": "https://rockpaperscissors-game.herokuapp.com/",
        "methods": ["GET", "POST"]
    }
});

io.on("connection", (socket) => SocketController(socket, io));
