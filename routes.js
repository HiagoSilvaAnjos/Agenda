const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const contactController = require("./src/controllers/contactController");
const userController = require("./src/controllers/userController");

// rotas da page home
route.get("/", homeController.initialPage);
route.post("/", homeController.postPage);

// Rotas de contato
route.get("/contacts", contactController.initialPage);

// Rotas de usuários
route.get("/users", userController.initialPage)

module.exports = route;