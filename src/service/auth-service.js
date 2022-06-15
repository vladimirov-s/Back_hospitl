const User = require("../models/user");
const bcrypt = require("bcrypt");
const TokenService = require("./../service/token-service");
const UserDto = require("../dtos/user-dtos");
const ApiError = require("rest-api-errors");
const HASH_ROUDS = 10;

class AuthService {
  async registration(name, password) {
    const candidate = await User.findOne({ name: name });

    if (candidate) {
      throw new Error(`User ${name} already exist`);
    }

    const hashPassword = bcrypt.hashSync(password, HASH_ROUDS);
    const user = await User.create({
      name: name,
      password: hashPassword,
    });

    const userDto = new UserDto(user);
    const token = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, token.refreshToken);
    return { token: token, user: userDto };
  }

  async login(name, password) {
    const user = await User.findOne({ name });

    if (!user) {
      throw new ApiError.BadRequestError(`User ${name} did't find`);
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      throw new ApiError.BadRequestError(`Password is wrong`);
    }
    const userDto = new UserDto(user);
    const token = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, token.refreshToken);
    return { token: token, user: userDto };
  }

  async logout(refreshToken) {
    const token = await TokenService.removetoken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new ApiError.UnauthorizedError();
    }

    const personalToken = await TokenService.validateRefreshToken(refreshToken);
    const savedToken = await TokenService.findToken(refreshToken);

    if (!personalToken || !savedToken) {
      throw new ApiError.UnauthorizedError();
    }

    const user = await User.findById(personalToken.id);
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, token.refreshToken);

    return { token: tokens, user: userDto };
  }
}

module.exports = new AuthService();
