const appointModel = require("./../models/appointment");
const tokenService = require("./../service/token-service");
const ApiError = require("rest-api-errors");

class AppointService {
  async createappoint(accessToken, customer, doctor, date, complaits) {
    if (!accessToken) {
      throw new ApiError.UnauthorizedError("accessTokena нет");
    }

    const personalTok = await tokenService.checkAcesToken(accessToken);
    if (!personalTok) {
      throw new ApiError.UnauthorizedError("accessToken дохленький");
    }

    const appoint = await appointModel.create({
      user: personalTok.id,
      customerName: customer,
      doctorname: doctor,
      date: date,
      complaint: complaits,
    });
    return appoint;
  }

  async editAppoint(
    accessToken,
    id,
    customerName,
    doctorname,
    date,
    complaint
  ) {
    if (!accessToken) {
      throw new ApiError.UnauthorizedError("accessToken нет");
    }

    const personalTok = await tokenService.checkAcesToken(accessToken);
    if (!personalTok) {
      throw new ApiError.UnauthorizedError("accessToken дохленький");
    }

    await appointModel.updateOne(
      { _id: id },
      {
        $set: {
          customerName: customerName,
          doctorname: doctorname,
          date: date,
          complaint: complaint,
        },
      }
    );
    return;
  }

  async getAppointments(accessToken) {
    if (!accessToken) {
      throw new ApiError.UnauthorizedError("accessToken нет");
    }

    const personalTok = await tokenService.checkAcesToken(accessToken);

    if (!personalTok) {
      throw new ApiError.UnauthorizedError("accessToken дохленький");
    }

    const allAppoints = await appointModel.find({ user: personalTok.id });
    return allAppoints;
  }

  async deleteAppoint(accessToken, appointId) {
    if (!accessToken) {
      throw new ApiError.UnauthorizedError("Рефреш токена нет");
    }

    const personalTok = await tokenService.checkAcesToken(accessToken);
    if (!personalTok) {
      throw new ApiError.UnauthorizedError("Решрештокен не прошел валидацию");
    }

    const removed = await appointModel.deleteOne({ _id: appointId });
    return removed;
  }
}

module.exports = new AppointService();
