const Router = require("express").Router;
const router = new Router();
const appointmentController = require("../controllers/appointment.controller");
const appointmentShema = require("../middlewares/appointment-shema");

router.post(
  "/createAppointment",
  appointmentShema,
  appointmentController.createAppointment
);
router.patch(
  "/editAppointment",
  appointmentShema,
  appointmentController.editAppointment
);
router.delete("/deleteAppoint", appointmentController.deleteAppoint);
router.get("/appointments", appointmentController.getAppoints);

module.exports = router;
