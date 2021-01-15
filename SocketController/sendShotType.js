const { winRulesObject } = require("../Utils");

const getGameWinner = (playerOne, playerTwo) => {
    const isWin = winRulesObject[playerOne.shotType][playerTwo.shotType];
    const winner = isWin ? isWin !== "equal" ? playerOne.username : "equal" : playerTwo.username;

    return winner;
};

const incrementScoreForWinner = (scores, winner) => ({
    ...scores,
    [winner]: scores[winner] + 1
});

const updateRoom = (newRoom, roomsCreated, roomName) => {
    roomsCreated[roomName] = newRoom;
};

const sendShotType = (data, socket, io, roomsCreated) => {
    const { shotType, username, roomName } = data;
    const room = roomsCreated[roomName];
    const shots = room.shots;

    room.shots = [...shots, { username, shotType }];

    const playerOne = room.shots[0];
    const playerTwo = room.shots[1];

    if (room.shots.length === 2)
    {
        const winner = getGameWinner(playerOne, playerTwo);
        const scores = room.scores;

        if (winner !== "equal")
        {
            room.scores = incrementScoreForWinner(scores, winner);
        }
        room.winner = winner;

        updateRoom(room, roomsCreated, roomName);

        io.to(roomName).emit("game result", room);
    }
};

module.exports = sendShotType;
