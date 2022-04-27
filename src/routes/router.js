const Router = require("express").Router;
const userController = require("../controllers/user.controller");
const router = new Router();
const { check } = require("express-validator");
const authMiddleWare = require("./../middleWaree/authMiddleWare");

router.post(
  "/registration",
  [
    check("name", "User name must be filled").notEmpty(),
    check(
      "password",
      "Password must be between 6 - 10 characters"
    ).isLength({
      min: 6,
      max: 10,
    }),
  ],
  userController.registration
);
router.post("/login", userController.login);

module.exports = router;
