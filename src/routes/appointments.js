const Router = require("express").Router;
const router = new Router();
const appointmentController = require("../controllers/appointment.controller");

router.post("/createAppointment", appointmentController.createAppointment);
router.delete("/deleteAppoint", appointmentController.deleteAppoint);
router.get("/appointments", appointmentController.getAppoints);
router.patch("/editAppointment", appointmentController.editAppointment);

module.exports = router;
