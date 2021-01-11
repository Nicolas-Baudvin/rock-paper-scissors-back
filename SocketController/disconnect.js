const removeUserFromDataBaseBySocketID = (usersCreated, usersCreatedPropsKey, socketID) => {
    usersCreatedPropsKey.forEach((username) => {
        if (usersCreated[username].socketID === socketID)
        {
            delete usersCreated[username];
            return;
        }
    });
};

const removeRoomFromDataBase = (roomsCreated, room) => delete roomsCreated[room];

const updateRoom = (roomsCreated, room, newUsersArray) => {
    const lastUser = newUsersArray[0];
    const roomUpdated = roomsCreated[room];

    roomUpdated.users = newUsersArray;
    roomUpdated.owner = lastUser;
    roomUpdated.scores = { [lastUser.username]: 0 };

    return roomUpdated;
};

const removeUserFromRoom = (roomsCreated, roomsKey, socket, io) => {
    roomsKey.forEach((name) => {
        if (roomsCreated[name].users.length && roomsCreated[name].users[0].id === socket.id || roomsCreated[name].users[1].id === socket.id)
        {
            const newUsersArray = roomsCreated[name].users.filter((user) => user.id !== socket.id);

            if (!newUsersArray.length)
            {
                removeRoomFromDataBase(roomsCreated, name);
                return;
            }
            const roomUpdated = updateRoom(roomsCreated, name, newUsersArray);

            roomsCreated[name] = roomUpdated;

            return io.to(name).emit("user leave", roomsCreated[name]);
        }
    });
};

const disconnect = (roomsCreated, usersCreated, socket, io) => {
    const roomsKey = Object.keys(roomsCreated);
    const usersCreatedPropsKey = Object.keys(usersCreated);

    if (usersCreatedPropsKey.length)
    {
        removeUserFromDataBaseBySocketID(usersCreated, usersCreatedPropsKey, socket.id);
    }

    if (roomsKey.length)
    {
        removeUserFromRoom(roomsCreated, roomsKey, socket, io);
    }
};

module.exports = disconnect;
