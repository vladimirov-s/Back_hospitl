const appoinService = require("./../service/appoint-sevice");

class AppointmentController {
  async createAppointment(req, res) {
    try {
      const { customer, doctor, complaint, date } = req.body;
      const accessToken = req.cookies.accessToken;
      const appoint = await appoinService.createappoint(
        accessToken,
        customer,
        doctor,
        date,
        complaint
      );
      const allAppUser = await appoinService.getAppointments(accessToken);
      return res.json({ data: allAppUser });
    } catch (err) {
      res.status(401).send("не авторизован");
      console.error(err);
    }
  }

  async editAppointment(req, res) {
    try {
      const { id, customerName, doctorname, date, complaint } = req.body;

      const accessToken = req.cookies.accessToken;

      const edited = await appoinService.editAppoint(
        accessToken,
        id,
        customerName,
        doctorname,
        date,
        complaint
      );
      const allAppoints = await appoinService.getAppointments(accessToken);
      res.json({ data: allAppoints });
    } catch (err) {
      res.status(401).send("не авторизован");
      console.error(err);
    }
  }

  async getAppoints(req, res) {
    try {
      const accessToken = req.cookies.accessToken;
      const appointments = await appoinService.getAppointments(accessToken);
      res.json({ data: appointments });
    } catch (err) {
      res.status(401).send("не авторизован");
      console.error(err);
    }
  }
  async deleteAppoint(req, res) {
    try {
      const { appointId } = req.body;
      const accessToken = req.cookies.accessToken;

      await appoinService.deleteAppoint(accessToken, appointId);
      const allAppsUser = await appoinService.getAppointments(accessToken);

      return res.json(allAppsUser);
    } catch (err) {
      res.status(401).send("не авторизован");
      console.error(err);
    }
  }
}

module.exports = new AppointmentController();
