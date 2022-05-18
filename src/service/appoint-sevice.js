const appointModel = require("./../models/appointment");
const User = require("../models/user");
const tokenService = require("./../service/token-service");
const ApiError = require("rest-api-errors");

class AppointService {
  async createappoint(refreshToken, customer, doctor, date, complaits) {
    if (!refreshToken) {
      throw new ApiError.UnauthorizedError("Рефреш токена нет");
    }

    const personalTok = await tokenService.validateToken(refreshToken);
    if (!personalTok) {
      throw new ApiError.UnauthorizedError("Решрештокен не прошел валидацию");
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

  async getAppointments(refreshToken, secTask, next) {
    if (!refreshToken) {
      throw new ApiError.UnauthorizedError("Рефреш токена нет");
    }

    const personalTok = await tokenService.validateToken(refreshToken);

    if (!personalTok) {
      throw new ApiError.UnauthorizedError("Решрештокен не прошел валидацию");
    }

    const allAppoints = await appointModel.find({ user: personalTok.id });
    // next(secTask);
    return allAppoints;
  }

  async deleteAppoint(refreshToken, appointId) {
    if (!refreshToken) {
      throw new ApiError.UnauthorizedError("Рефреш токена нет");
    }

    const personalTok = await tokenService.validateToken(refreshToken);
    console.log(personalTok);
    if (!personalTok) {
      throw new ApiError.UnauthorizedError("Решрештокен не прошел валидацию");
    }

    const removed = await appointModel.deleteOne({ _id: appointId });
    return removed;
  }
}

module.exports = new AppointService();
