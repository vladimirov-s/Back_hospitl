const Router = require("express").Router;
const userController = require("../controllers/user.controller");
const router = new Router();
const authSchema = require("../middlewares/auth-schema");

router.post("/registration", authSchema, userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/createappointment", userController.createAppointment);
router.delete("/deleteAppoint", userController.deleteAppoint);
router.get("/appointments", userController.getAppoints);
router.get("/refresh", userController.refresh);
router.patch("/editAppointment", userController.editAppointment);

module.exports = router;
