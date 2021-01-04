const createRoom = (socket, data, roomsCreated, io) => {

    const { roomName, username, id } = data;

    if (roomsCreated[roomName])
    {
        return socket.emit("fail creating room", "Room Already exist, try another name");
    }
    socket.join(roomName);

    const newRoom = {
        "name": roomName,
        "owner": { username, "uniqueID": id, "socketID": socket.id },
        "users": [{ "id": socket.id, username, "uniqueID": id }],
        "messages": [],
        "scores": { [username]: 0 },
        "shots": []
    };

    roomsCreated[roomName] = newRoom;
    socket.emit("room created", newRoom);
};

module.exports = createRoom;
