const { Router } = require("express");

const authController = require("./app/controllers/userController/authController");
const registerController = require("./app/controllers/userController/registerController");

const routes = Router();

routes.post("/authenticate", authController.create);
routes.post("/register", registerController.create);

module.exports = routes;
