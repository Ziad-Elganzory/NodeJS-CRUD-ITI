const express = require("express");
const Router = new express.Router();
const UsersController = require("../Controllers/users.controller");

Router.post("/signup", UsersController.Register);
Router.post("/login", UsersController.Login);

module.exports = Router;
