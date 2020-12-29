const joinRoom = (socket, data, roomsCreated, io) => {
    const { roomName, username, id } = data;

    if (!roomsCreated[roomName])
    {
        return socket.emit("fail join", "No room with this name !");
    }

    socket.join(roomName);
    roomsCreated[roomName].users.push({ "id": socket.id, username, "uniqueID": id });
    socket.emit("room joined", roomsCreated[roomName]);
    io.to(roomName).emit("user join", roomsCreated[roomName]);
};

module.exports = joinRoom;
