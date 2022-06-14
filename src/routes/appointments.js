const Router = require("express").Router;
const router = new Router();
const AppointmentController = require("../controllers/appointment.controller");
const appointmentShema = require("../middlewares/appointment-shema");
const finalCheck = require("../middlewares/final-check");

router.post(
  "/createAppointment",
  appointmentShema,
  finalCheck,
  AppointmentController.createAppointment
);
router.patch(
  "/editAppointment",
  appointmentShema,
  finalCheck,
  AppointmentController.editAppointment
);
router.delete("/deleteAppointment", AppointmentController.deleteAppointments);
router.get("/appointments", AppointmentController.getAppointments);

module.exports = router;
