const joinRoom = (socket, data, roomsCreated, io) => {
    const { roomName, username } = data;
    
    if (!roomsCreated[roomName])
    {
        return socket.emit("fail join", "No room with this name !");
    }
    
    if (roomsCreated[roomName].users.length >= 2)
    {
        return socket.emit("fail join", "This room is full");
    }
    const scores = roomsCreated[roomName].scores;
    
    socket.join(roomName);
    roomsCreated[roomName].users.push({ "id": socket.id, username });
    roomsCreated[roomName].scores = { ...scores, [username]: 0 };

    socket.emit("room joined", roomsCreated[roomName]);
    io.to(roomName).emit("user join", roomsCreated[roomName]);
};

module.exports = joinRoom;
