const crypto = require("crypto");

const generateId = (username) => {
    const id = crypto.randomBytes(16).toString("hex");

    const result = id.concat("-", username);
    
    console.log(id);
    return result;
};

const createUser = (data) => {
    const { socket, username } = data;

    console.log("Création d'un ID");
    const id = generateId(username);

    return socket.emit("get id", id);
};

module.exports = createUser;
