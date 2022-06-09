const Router = require("express").Router;
const router = new Router();
const AppointmentController = require("../controllers/appointment.controller");
const appointmentShema = require("../middlewares/appointment-shema");
const final_check = require("../middlewares/final-check");

router.post(
  "/createAppointment",
  appointmentShema,
  final_check,
  AppointmentController.createAppointment
);
router.patch(
  "/editAppointment",
  appointmentShema,
  final_check,
  AppointmentController.editAppointment
);
router.delete("/deleteAppoint", AppointmentController.deleteAppointments);
router.get("/appointments", AppointmentController.getAppointments);

module.exports = router;
