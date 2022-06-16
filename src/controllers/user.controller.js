const User = require("../models/user");
const AuthService = require("./../service/auth-service");
const { validationResult } = require("express-validator");

const acesTokenParameters = {
  maxAge: 60 * 60 * 1000,
  httpOnly: true,
};
const refreshTokenParameters = {
  maxAge: 30 * 24 * 60 * 60 * 1000,
  httpOnly: true,
};
class UserController {
  async registration(req, res) {
    try {
      const { name, password } = req.body;
      const createNewUser = await AuthService.registration(name, password);
      res.cookie(
        "refreshToken",
        createNewUser.token.refreshToken,
        refreshTokenParameters
      );
      res.cookie(
        "accessToken",
        createNewUser.token.accessToken,
        acesTokenParameters
      );
      return res.json(createNewUser.user);
    } catch (err) {
      console.error(err);
      res.status(409).json({ data: "Такой пользователь уже существует" });
    }
  }

  async login(req, res) {
    try {
      const { name, password } = req.body;
      const login = await AuthService.login(name, password);
      res.cookie(
        "refreshToken",
        login.token.refreshToken,
        refreshTokenParameters
      );
      res.cookie("accessToken", login.token.accessToken, acesTokenParameters);

      return res.json(login.user);
    } catch (err) {
      res.status(400).send("some error occured");
      console.error(err);
    }
  }

  async logout(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken;
      const token = await AuthService.logout(refreshToken);
      res.clearCookie("refreshToken");
      res.clearCookie("accessToken");
      return res.json(token);
    } catch (err) {
      res.status(400).send("some error occured");
      console.error(err);
    }
  }

  async refresh(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken;
      const userData = await AuthService.refresh(refreshToken);

      res.cookie(
        "refreshToken",
        userData.token.refreshToken,
        refreshTokenParameters
      );
      res.cookie(
        "accessToken",
        userData.token.accessToken,
        acesTokenParameters
      );
      return res.json(userData.user);
    } catch (err) {
      res.clearCookie("refreshToken");
      res.clearCookie("accessToken");
      res.status(400).send("some error occured");
      console.error(err);
    }
  }
}

module.exports = new UserController();
