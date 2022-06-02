const Router = require("express").Router;
const userController = require("../controllers/user.controller");
const router = new Router();
const authSchema = require("../middlewares/auth-schema");

router.post("/registration", authSchema, userController.registration);
router.post("/login", authSchema, userController.login);
router.get("/logout", userController.logout);
router.get("/refresh", userController.refresh);

module.exports = router;
