const disconnect = (roomsCreated, socket, io) => {

    console.log("Déconnexion d'un utilisateur");
    const roomsKey = Object.keys(roomsCreated);

    if (roomsKey.length)
    {
        roomsKey.forEach((room) => {
            if (roomsCreated[room].users[0].id === socket.id || roomsCreated[room].users[1].id === socket.id)
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

};

module.exports = disconnect;
