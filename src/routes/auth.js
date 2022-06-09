const Express = require("express").Router;
const UserController = require("../controllers/user.controller");
const Router = new Express();
const authSchema = require("../middlewares/auth-schema");
const final_check = require("../middlewares/final-check");

Router.post(
  "/registration",
  authSchema,
  final_check,
  UserController.registration
);
Router.post("/login", authSchema, final_check, UserController.login);
Router.get("/logout", UserController.logout);
Router.get("/refresh", UserController.refresh);

module.exports = Router;
