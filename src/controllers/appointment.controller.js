const AppointmentService = require("./../service/appoint-sevice");
const { validationResult } = require("express-validator");

class AppointmentController {
  async createAppointment(req, res) {
    try {
      const { customer, doctor, complaint, date } = req.body;
      const accessToken = req.cookies.accessToken;
      const errors = validationResult(req);

      if (!accessToken || !errors.isEmpty()) {
        console.error(errors);
        return res.status(400).send("some error occured");
      }

      const appoint = await AppointmentService.createappoint(
        accessToken,
        customer,
        doctor,
        date,
        complaint
      );
      return res.json({ data: appoint });
    } catch (err) {
      res.status(400).send("Something went wrong");
      console.error(err);
    }
  }

  async editAppointment(req, res) {
    try {
      const { id, customer, doctor, date, complaint } = req.body;
      const accessToken = req.cookies.accessToken;
      const errors = validationResult(req);

      if (!accessToken || !errors.isEmpty()) {
        console.error(errors);
        return res.status(400).send("some error occured");
      }

      const edited = await AppointmentService.editAppoint(
        accessToken,
        id,
        customer,
        doctor,
        date,
        complaint
      );
      res.json({ data: edited });
    } catch (err) {
      res.status(400).send("Something went wrong");
      console.error(err);
    }
  }

  async getAppoints(req, res) {
    try {
      const accessToken = req.cookies.accessToken;

      if (!accessToken) {
        return res.status(400).send("some error occured");
      }

      const appointments = await AppointmentService.getAppointments(accessToken);
      res.json({ data: appointments });
    } catch (err) {
      res.status(400).send("Something went wrong");
      console.error(err);
    }
  }
  async deleteAppoint(req, res) {
    try {
      const appointId = req.body.appointId;
      const accessToken = req.cookies.accessToken;

      if (!accessToken) {
        console.error(errors);
        return res.status(400).send("some error occured");
      }

      await AppointmentService.deleteAppoint(accessToken, appointId);
      const allAppsUser = await AppointmentService.getAppointments(accessToken);

      return res.json({ data: allAppsUser });
    } catch (err) {
      res.status(400).send("Something went wrong");
      console.error(err);
    }
  }
}

module.exports = new AppointmentController();
