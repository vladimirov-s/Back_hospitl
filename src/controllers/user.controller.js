const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { secret } = require("../../config");
const HASH_ROUDS = 10;

const generateAccessToken = id => {
  const payload = {
    id,
  };
  return jwt.sign(payload, secret, {
    expiresIn: "24h",
  });
};

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
      const candidate = await User.findOne({
        name: name,
      });

      if (candidate) {
        return res.status(400).json({
          message: "Error. such user already exist",
        });
      }

      const hashPassword = bcrypt.hashSync(password, HASH_ROUDS);
      const user = new User({
        name: name,
        password: hashPassword,
      });
      await user.save();

      return res.json({
        data: "success",
      });
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
      const user = await User.findOne({
        name,
      });

      if (!user) {
        return res.status(400).json({
          data: `user ${name} does not found`,
        });
      }

      const validPassword = bcrypt.compareSync(
        password,
        user.password
      );
      if (!validPassword) {
        return res.status(400).json({
          data: `incorrect password`,
        });
      }
      const token = generateAccessToken(user._id);
      return res.json({ token });
    } catch (err) {
      console.log(e);
      res.status(400).json({ data: "Login error" });
    }
  }
}

module.exports = new UserController();
