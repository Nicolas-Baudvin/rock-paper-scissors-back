const createUser = require("./createUser");
const createRoom = require("./createRoom");
const logOut = require("./logOut");
const joinRoom = require("./joinRoom");

let roomsCreated = {};

const socketApp = (socket, io) => {
    console.log("Connexion en cours d'un utilisateur");

    socket.on("new user", (username) => createUser({ socket, username }));

    socket.on("disconnect", () => {
        console.log("Déconnexion d'un utilisateur");
        const roomsKey = Object.keys(roomsCreated);

        console.log(roomsKey);
        if (roomsKey.length)
        {
            roomsKey.forEach((room) => {
                if (roomsCreated[room].users[0].id === socket.id || roomsCreated[room].users[1].id === socket.id )
                {
                    console.log(`Supression de l'utilisateur de la salle ${room}`);
                    const newUsersArray = roomsCreated[room].users.filter((user) => user.id !== socket.id);
                    const lastUser = newUsersArray[0];
                    
                    roomsCreated[room].users = newUsersArray;
                    roomsCreated[room].owner = lastUser;
                    io.to(room).emit("user leave", roomsCreated[room]);
                }
            });
        }
    });

    socket.on("create room", (data) => createRoom(socket, data, roomsCreated, io));

    socket.on("join room", (data) => joinRoom(socket, data, roomsCreated, io));

    socket.on("logout", () => logOut(socket));
};

module.exports = socketApp;
