const userService = require("./../service/auth-service");
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
      const createNewUser = await userService.registration(
        name,
        password
      );
      res.cookie("refreshToken", createNewUser.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(createNewUser);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        data: "Registration error",
      });
    }
  }

  async login(req, res) {
    try {
      const { name, password } = req.body;
      const login = await userService.login(name, password);
      res.cookie("refreshToken", login.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(login);
    } catch (err) {
      console.log(err);
      res.status(400).json({ data: "Login error" });
    }
  }

  async logout(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {}
  }
}

module.exports = new UserController();
