const User = require("../models/user");
const authService = require("./../service/auth-service");
const appoinService = require("./../service/appoint-sevice");
const { validationResult } = require("express-validator");

class UserController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "ваш запрос не валиден",
          value: errors.errors[0].value,
          inFields: errors.errors[0].param,
        });
      }

      const { name, password } = req.body;
      const createNewUser = await authService.registration(name, password);
      res.cookie("refreshToken", createNewUser.token.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(createNewUser);
    } catch (err) {
      console.error(err);
      res.status(400).json({ data: "Такой пользователь уже существует" });
    }
  }

  async login(req, res) {
    try {
      const { name, password } = req.body;
      const login = await authService.login(name, password);
      res.cookie("refreshToken", login.token.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(login);
    } catch (err) {
      res.status(400).json({ data: "something went wrong" });
    }
  }

  async logout(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const token = await authService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (err) {
      res.status(401).json({ data: "some error occured" });
      console.error(err);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await authService.refresh(refreshToken);

      res.cookie("refreshToken", userData.token.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (err) {
      res.status(401).json({ data: "some error occured" });
      console.error(err);
    }
  }

  // Appointment routes

  async createAppointment(req, res) {
    try {
      const { customer, doctor, complaint, date } = req.body;
      const { refreshToken } = req.cookies;

      const appoint = await appoinService.createappoint(
        refreshToken,
        customer,
        doctor,
        date,
        complaint
      );
      const allAppUser = await appoinService.getAppointments(refreshToken);
      return res.json({ data: allAppUser });
    } catch (err) {
      res.status(401).json({ data: "some error occured" });
      console.error(err);
    }
  }

  async getAppoints(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const appointments = await appoinService.getAppointments(refreshToken);
      res.json({ data: appointments });
    } catch (err) {
      res.status(401).json({ data: "some error occured" });
      console.error(err);
    }
  }
  async deleteAppoint(req, res) {
    try {
      const { appointId } = req.body;
      const { refreshToken } = req.cookies;
      await appoinService.deleteAppoint(refreshToken, appointId);
      const allAppsUser = await appoinService.getAppointments(refreshToken);

      return res.json(allAppsUser);
    } catch (err) {
      res.status(401).json({ data: "some error occured" });
      console.error(err);
    }
  }
}

module.exports = new UserController();
