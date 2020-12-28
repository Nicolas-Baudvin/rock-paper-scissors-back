const createUser = require("./createUser");
const createRoom = require("./createRoom");

let roomCreated = {};

const socketApp = (socket, io) => {
    console.log("Connexion en cours d'un utilisateur");

    socket.on("new user", (username) => createUser({ socket, username }));

    socket.on("disconnect", () => {
        console.log("Déconnexion d'un utilisateur");
    });

    socket.on("create room", (data) => createRoom(socket, data, roomCreated, io));
};

module.exports = socketApp;
