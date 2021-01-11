const updateRoom = ({ roomsCreated, roomName, socket, username }) => {
    const scores = roomsCreated[roomName].scores;
    const roomUpdated = roomsCreated[roomName];

    roomUpdated.users.push({ "id": socket.id, username });
    roomUpdated.scores = { ...scores, [username]: 0 };
    return roomUpdated;
};

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

    socket.join(roomName);

    const roomUpdated = updateRoom({ roomsCreated, roomName, socket, username });

    socket.emit("room joined", roomUpdated);
    io.to(roomName).emit("user join", roomUpdated);
};

module.exports = joinRoom;
