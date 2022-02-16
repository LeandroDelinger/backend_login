const { Router } = require("express");

const authController = require("./app/controllers/userController/authController");
const registerController = require("./app/controllers/userController/registerController");
const projectController = require("./app/controllers/userController/projectController");
const authMiddleware = require("./app/middlewares/auth");
const forgotPasswordController = require("./app/controllers/userController/forgotPassController");
const resetPasswordController = require("./app/controllers/userController/resetPasswordController");

const routes = Router();

routes.post("/authenticate", authController.create);
routes.post("/register", registerController.create);
routes.get("/projects", authMiddleware, projectController.project);
routes.post("/forgot_password", forgotPasswordController.forgotPass);
routes.post("/reset_password", resetPasswordController.restetPass);

module.exports = routes;
