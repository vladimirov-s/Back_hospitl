const User = require("../models/user");
const userService = require("./../service/auth-service");
const appoinService = require("./../service/appoint-sevice");
const { validationResult } = require("express-validator");

class UserController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          data: "something went wrong",
          errors,
        });
      }

      const { name, password } = req.body;
      const createNewUser = await userService.registration(name, password);
      res.cookie("refreshToken", createNewUser.token.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(createNewUser);
    } catch (err) {
      res.status(400).json({
        data: "Registration error",
      });
    }
  }

  async login(req, res) {
    try {
      const { name, password } = req.body;
      const login = await userService.login(name, password);
      res.cookie("refreshToken", login.token.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(login);
    } catch (err) {
      res.status(400).json({ data: "Login error" });
    }
  }

  async logout(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      res.status(400).json({
        data: "something went wrong",
      });
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);

      res.cookie("refreshToken", userData.token.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async createAppointment(req, res) {
    const { id, customer, doctor, complaint, date } = req.body;

    try {
      const appoint = await appoinService.createappoint(
        id,
        customer,
        doctor,
        date,
        complaint
      );
      const allAppUser = await appoinService.getAppointments(id);
      return res.json(allAppUser);
    } catch {
      (err) => console.error(err);
    }
  }

  async getAppoints(req, res) {
    const { ownerId } = req.query;
    const owner = await User.findOne({ _id: ownerId });
    if (!owner) {
      res.status(404).json({ data: "Хуйня какая то произошла" });
    } else {
      const appointments = await appoinService.getAppointments(ownerId);
      res.json(appointments);
    }
  }

  async deleteAppoint(req, res) {
    const { ownerId, appointId } = req.body;
    try {
      const deletResult = await appoinService.deleteAppoint(appointId);
      const allAppUser = await appoinService.getAppointments(ownerId);

      return res.json(allAppUser);
    } catch {
      (err) => console.error(err);
    }
  }
}

module.exports = new UserController();
