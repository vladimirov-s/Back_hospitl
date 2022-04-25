const UserModel = require('./../models/user-schema');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const tokenService = require('./token-service');

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email })
    if (candidate) {
      throw new Error(`User with email ${email} already exist`)
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await UserModel.create({
      email, password: hashPassword, activationLink
    });
    const tokens = tokenService.generateTokens()
  }
}

module.exports = new UserService();