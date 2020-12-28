const createRoom = (socket, data, roomCreated, io) => {

    const { roomName, username, id } = data;

    socket.join(roomName);

    const newRoom = {
        "name": roomName,
        "owner": { username, "uniqueID": id, "socketID": socket.id },
        "users": [{ "id": socket.id, username, "uniqueID": id }],
        "messages": [],
        "scores": []
    };

    roomCreated[roomName] = newRoom;

    socket.emit("room created", newRoom);
};

module.exports = createRoom;
