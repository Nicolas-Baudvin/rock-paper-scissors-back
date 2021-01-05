const { winRulesObject } = require("../Utils");

const sendShotType = (data, socket, io, roomsCreated) => {
    const { shotType, username, roomName } = data;
    const shots = roomsCreated[roomName].shots;

    roomsCreated[roomName].shots = [...shots, { username, shotType }];

    const playerOne = roomsCreated[roomName].shots[0];
    const playerTwo = roomsCreated[roomName].shots[1];

    if (roomsCreated[roomName].shots.length === 2)
    {
        const isWin = winRulesObject[playerOne.shotType][playerTwo.shotType];
        const winner = isWin ? isWin !== "equal" ? playerOne.username : "equal" : playerTwo.username;
        const scores = roomsCreated[roomName].scores;

        if (winner !== "equal")
        {
            roomsCreated[roomName].scores = { ...scores, [winner]: scores[winner] + 1 };
        }
        roomsCreated[roomName].winner = winner;
        io.to(roomName).emit("game result", roomsCreated[roomName]);
    }
};

module.exports = sendShotType;
