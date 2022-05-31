const User = require("../models/user");
const authService = require("./../service/auth-service");
const appoinService = require("./../service/appoint-sevice");
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
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).send("some error occured");
      }

      const { name, password } = req.body;
      const createNewUser = await authService.registration(name, password);
      res.cookie(
        "refreshToken",
        createNewUser.token.refreshToken,
        refreshTokenParameters
      );
      res.cookie(
        createNewUser.token.accessToken,
        acesTokenParameters,
        "accessToken"
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

      if (!name || !password) {
        return res.status(400).send("some error occured");
      }

      const login = await authService.login(name, password);
      res.cookie(
        "refreshToken",
        login.token.refreshToken,
        refreshTokenParameters
      );
      res.cookie(
        "accessToken", 
        login.token.accessToken, 
         acesTokenParameters
      );

      return res.json(login.user);
    } catch (err) {
      res.status(400).send("some error occured");
      console.error(err);
    }
  }

  async logout(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return res.status(400).send("some error occured");
      }

      const token = await authService.logout(refreshToken);
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

      if (!refreshToken) {
        return res.status(400).send("some error occured");
      }

      const userData = await authService.refresh(refreshToken);

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
