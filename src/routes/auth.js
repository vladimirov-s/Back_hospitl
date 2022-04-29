const Router = require("express").Router;
const userController = require("../controllers/user.controller");
const router = new Router();
const authSchema = require("../middlewares/auth-schema");

router.post(
  "/registration",
  authSchema,
  userController.registration
);
router.post("/login", userController.login);

module.exports = router;
