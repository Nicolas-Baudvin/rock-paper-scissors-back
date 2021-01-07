const createUser = (socket, username, usersCreated) => {
    if (usersCreated[username])
    {
        return socket.emit("user already exist", "Your username already exists");
    }
    usersCreated[username] = {
        socketID: socket.id
    };

    return socket.emit("user created", socket.id);
};

module.exports = createUser;
