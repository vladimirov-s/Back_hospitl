const appoinService = require("./../service/appoint-sevice");

class AppointmentController {
  async createAppointment(req, res) {
    try {
      const { customer, doctor, complaint, date } = req.body;
      const accessToken = req.cookies.accessToken;

      if (!accessToken) {
        return res.status(400).send("some error occured");
      }

      const appoint = await appoinService.createappoint(
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
      const { id, customerName, doctorname, date, complaint } = req.body;
      const accessToken = req.cookies.accessToken;

      if (!id || !accessToken) {
        return res.status(400).send("some error occured");
      }

      const edited = await appoinService.editAppoint(
        accessToken,
        id,
        customerName,
        doctorname,
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

      const appointments = await appoinService.getAppointments(accessToken);
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

      if (!appointId || !accessToken) {
        return res.status(400).send("some error occured");
      }

      await appoinService.deleteAppoint(accessToken, appointId);
      const allAppsUser = await appoinService.getAppointments(accessToken);

      return res.json({ data: allAppsUser });
    } catch (err) {
      res.status(400).send("Something went wrong");
      console.error(err);
    }
  }
}

module.exports = new AppointmentController();
