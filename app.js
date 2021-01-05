require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const path = require("path");

const app = express();

// mongoose.connect(process.env.MONGO_CONNECTION_LINK,
//     {
//         "useNewUrlParser": true,
//         "useUnifiedTopology": true
//     })
//     .then(() => console.log("Connexion à MongoDB réussie !"))
//     .catch((e) => console.log("Connexion à MongoDB échouée !", e));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://rockpaperscissors-game.herokuapp.com/");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

app.use(helmet());

app.use(express.json());

module.exports = app;
