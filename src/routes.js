const { Router } = require("express");

const authController = require("./app/controllers/userController/authController");
const registerController = require("./app/controllers/userController/registerController");
const projectController = require("./app/controllers/projectController");
const authMiddleware = require("./app/middlewares/auth");

const routes = Router();

routes.post("/authenticate", authController.create);
routes.post("/register", registerController.create);
routes.get("/projects", authMiddleware, projectController.project);

module.exports = routes;
