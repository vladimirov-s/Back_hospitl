const Express = require("express").Router;
const UserController = require("../controllers/user.controller");
const Router = new Express();
const authSchema = require("../middlewares/auth-schema");
const finalCheck = require("../middlewares/final-check");

Router.post(
  "/registration",
  authSchema,
  finalCheck,
  UserController.registration
);
Router.post("/login", authSchema, finalCheck, UserController.login);
Router.get("/logout", UserController.logout);
Router.get("/refresh", UserController.refresh);

module.exports = Router;
