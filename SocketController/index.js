const createUser = require("./createUser");
const createRoom = require("./createRoom");
const logOut = require("./logOut");
const joinRoom = require("./joinRoom");
const sendShotType = require("./sendShotType");
const disconnect = require("./disconnect");
const playAgain = require("./playAgain");

let roomsCreated = {};

const socketApp = (socket, io) => {
    console.log("Connexion en cours d'un utilisateur");

    socket.on("new user", (username) => createUser({ socket, username }));
    
    socket.on("play again", (roomName) => playAgain(roomName, roomsCreated, socket, io));

    socket.on("send shot type", (data) => sendShotType(data, socket, io, roomsCreated));

    socket.on("disconnect", () => disconnect(roomsCreated, socket, io));

    socket.on("create room", (data) => createRoom(socket, data, roomsCreated, io));

    socket.on("join room", (data) => joinRoom(socket, data, roomsCreated, io));

    socket.on("logout", (roomName) => logOut(socket, roomName, roomsCreated));
};

module.exports = socketApp;
