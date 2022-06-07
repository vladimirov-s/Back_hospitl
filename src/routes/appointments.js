const Router = require("express").Router;
const router = new Router();
const AppointmentController = require("../controllers/appointment.controller");
const appointmentShema = require("../middlewares/appointment-shema");

router.post(
  "/createAppointment",
  appointmentShema,
  AppointmentController.createAppointment
);
router.patch(
  "/editAppointment",
  appointmentShema,
  AppointmentController.editAppointment
);
router.delete("/deleteAppoint", AppointmentController.deleteAppoint);
router.get("/appointments", AppointmentController.getAppoints);

module.exports = router;
ё