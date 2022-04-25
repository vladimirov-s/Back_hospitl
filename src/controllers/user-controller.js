const User = require('./../models/user-schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { secret } = require('./../../config')
const HASH_ROUDS = 10;

const generateAccessToken = (id) => {
  const payload = {
    id
  }
  return jwt.sign(payload, secret, { expiresIn: "24h" });
}


class UserController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ data: 'Ащибка при регистрации', errors });
      }

      const { email, password } = req.body;
      const candidate = await User.findOne({ email: email });

      if (candidate) {
        return res.status(400).json({ message: "Пользователь с таким именем уже существует" })
      }

      const hashPassword = bcrypt.hashSync(password, HASH_ROUDS);
      const user = new User({ email: email, password: hashPassword });
      await user.save();

      return res.json({ data: 'Пользователь успешно зарегестрирован.' })
    } catch (err) {
      console.log(err);
      res.status(400).json({ data: "Registration error" })
    }
  }


  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ data: `Пользователь ${email} не найден` });
      }

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ data: `Введен не верный пароль` })
      }
      const token = generateAccessToken(user._id);
      return res.json({ token });

    } catch (err) {
      console.log(e);
      res.status(400).json({ data: "Login error" })
    }
  }


  async getUsers(req, res, next) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.log(err);
    }
  }
}


module.exports = new UserController();