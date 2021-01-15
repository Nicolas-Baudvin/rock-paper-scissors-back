const playAgain = (roomName, roomsCreated, socket, io) => {
    const scores = roomsCreated[roomName].shots;

    if (scores.length !== 1)
    {
        roomsCreated[roomName].shots = [];
        roomsCreated[roomName].winner = null;
    }

    socket.emit("shots reinitialized", roomsCreated[roomName]);
};

module.exports = playAgain;
