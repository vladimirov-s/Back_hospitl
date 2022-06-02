const Router = require("express").Router;
const router = new Router();
const appointmentController = require("../controllers/appointment.controller");
const appointmentShema = require("../middlewares/appointment-shema");
const appointDelete = require("../middlewares/appointment_delete_schema");

router.post(
  "/createappointment",
  appointmentShema,
  appointmentController.createAppointment
);
router.patch(
  "/editAppointment",
  appointmentShema,
  appointmentController.editAppointment
);
router.delete(
  "/deleteAppoint",
  appointDelete,
  appointmentController.deleteAppoint
);
router.get("/appointments", appointmentController.getAppoints);

module.exports = router;
