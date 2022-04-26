const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const router = new Router();
const { check } = require("express-validator");
const authMiddleWare = require("./../../middleWaree/authMiddleWare");

router.post(
  "/registration",
  [
    check(
      "email",
      "Имя пользователя не может быть пустым"
    ).notEmpty(),
    check(
      "password",
      "Пароль должен быть не меньше 6 и не больше 10 символов"
    ).isLength({ min: 6, max: 10 }),
  ],
  userController.registration
);
router.post("/login", userController.login);
router.get(
  "/users",
  authMiddleWare,
  userController.getUsers
);

module.exports = router;
