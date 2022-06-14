const AppointmentService = require("../service/appointment-sevice");

class AppointmentController {
  async createAppointment(req, res) {
    try {
      const { customer, doctor, complaint, date } = req.body;
      const accessToken = req.cookies.accessToken;
      const appointment = await AppointmentService.createappoint(
        accessToken,
        customer,
        doctor,
        date,
        complaint
      );
      return res.json({ data: appointment });
    } catch (err) {
      res.status(400).send("Something went wrong");
      console.error(err);
    }
  }

  async editAppointment(req, res) {
    try {
      const { id, customer, doctor, date, complaint } = req.body;
      const accessToken = req.cookies.accessToken;
      const edited = await AppointmentService.editAppoint(
        accessToken,
        id,
        customer,
        doctor,
        date,
        complaint
      );
      return res.json({ data: edited });
    } catch (err) {
      res.status(400).send("Something went wrong");
      console.error(err);
    }
  }

  async getAppointments(req, res) {
    try {
      const accessToken = req.cookies.accessToken;
      const appointments = await AppointmentService.getAppointments(
        accessToken
      );
      return res.json({ data: appointments });
    } catch (err) {
      res.status(400).send("Something went wrong");
      console.error(err);
    }
  }
  async deleteAppointments(req, res) {
    try {
      const appointmentId = req.body.appointId;
      const accessToken = req.cookies.accessToken;
      await AppointmentService.deleteAppoint(accessToken, appointmentId);
      const allAppointmentsOfTheUser = await AppointmentService.getAppointments(
        accessToken
      );
      return res.json({ data: allAppointmentsOfTheUser });
    } catch (err) {
      res.status(400).send("Something went wrong");
      console.error(err);
    }
  }
}

module.exports = new AppointmentController();
