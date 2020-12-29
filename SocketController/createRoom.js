const createRoom = (socket, data, roomsCreated, io) => {

    const { roomName, username, id } = data;

    socket.join(roomName);
    if (roomsCreated[roomName])
    {
        return socket.emit("fail creating room", "Room Already exist, try another name");
    }

    const newRoom = {
        "name": roomName,
        "owner": { username, "uniqueID": id, "socketID": socket.id },
        "users": [{ "id": socket.id, username, "uniqueID": id }],
        "messages": [],
        "scores": [0, 0]
    };

    roomsCreated[roomName] = newRoom;
    socket.emit("room created", newRoom);
};

module.exports = createRoom;
