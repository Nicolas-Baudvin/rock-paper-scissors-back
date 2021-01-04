const clearUnusedRoom = (roomName, roomsCreated) => {
    const users = roomsCreated[roomName].users.length;

    if (!users.length)
    {
        delete roomsCreated[roomName];
    }
};

const logOut = (socket, roomName, roomsCreated) => {
    clearUnusedRoom(roomName, roomsCreated);
    socket.disconnect();
};

module.exports = logOut;
