const appointModel = require("../models/appointment");
const TokenService = require("./token-service");
const ApiError = require("rest-api-errors");

class AppointService {
  async createappoint(accessToken, customer, doctor, date, complaits) {
    if (!accessToken) {
      throw new ApiError.UnauthorizedError("accessTokena нет");
    }

    const personalToken = await TokenService.checkAcesToken(accessToken);
    if (!personalToken) {
      throw new ApiError.UnauthorizedError("accessToken дохленький");
    }

    const appointment = await appointModel.create({
      user: personalToken.id,
      customerName: customer,
      doctorName: doctor,
      date: date,
      complaint: complaits,
    });
    return appointment;
  }

  async editAppointment(
    accessToken,
    id,
    customerName,
    doctorName,
    date,
    complaint
  ) {
    if (!accessToken) {
      throw new ApiError.UnauthorizedError("accessToken нет");
    }

    const personalToken = await TokenService.checkAcesToken(accessToken);
    if (!personalToken) {
      throw new ApiError.UnauthorizedError("accessToken дохленький");
    }

    const edited = await appointModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          customerName: customerName,
          doctorName: doctorName,
          date: date,
          complaint: complaint,
        },
      }
    );
    return edited;
  }

  async getAppointments(accessToken) {
    if (!accessToken) {
      throw new ApiError.UnauthorizedError("accessToken нет");
    }

    const personalToken = await TokenService.checkAcesToken(accessToken);

    if (!personalToken) {
      throw new ApiError.UnauthorizedError("accessToken дохленький");
    }

    const allAppointments = await appointModel.find({ user: personalToken.id });
    return allAppointments;
  }

  async deleteAppoint(accessToken, appointId) {
    if (!accessToken) {
      throw new ApiError.UnauthorizedError("Рефреш токена нет");
    }

    const personalToken = await TokenService.checkAcesToken(accessToken);
    if (!personalToken) {
      throw new ApiError.UnauthorizedError("Решрештокен не прошел валидацию");
    }

    const removed = await appointModel.deleteOne({ _id: appointId });
    return removed;
  }
}

module.exports = new AppointService();
