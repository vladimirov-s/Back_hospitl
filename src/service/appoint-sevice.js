const appointModel = require("./../models/appointment");

class AppointService {
  async createappoint(
    userId,
    customer,
    doctor,
    date,
    complaits
  ) {
    const appoint = await appointModel.create({
      user: userId,
      customerName: customer,
      doctorname: doctor,
      date: date,
      complaint: complaits,
    });
    return appoint;
  }

  async getAppointments(id) {
    const allAppoints = await appointModel.find({ user: id });
    return allAppoints;
  }

  async deleteAppoint(id) {
    const delappoin = await appointModel.deleteOne({ _id: id });
    return delappoin;
  }
}

module.exports = new AppointService();
