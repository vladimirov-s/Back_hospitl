const Router = require("express").Router;
const UserController = require("../controllers/user.controller");
const RRouter = new Router();
const authSchema = require("../middlewares/auth-schema");

RRouter.post("/registration", authSchema, UserController.registration);
RRouter.post("/login", authSchema, UserController.login);
RRouter.get("/logout", UserController.logout);
RRouter.get("/refresh", UserController.refresh);

module.exports = RRouter;
