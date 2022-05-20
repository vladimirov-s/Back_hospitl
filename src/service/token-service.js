const jwt = require("jsonwebtoken");
const tokenModel = require("../models/token");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(
      payload, 
      `${process.env.JWT_ACCESS_SECRET}`, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(
      payload, 
      `${process.env.JWT_REFRES_SECRET}`, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await tokenModel.create({
      user: userId,
      refreshToken: refreshToken,
    });
    return token;
  }

  checkAcesToken(accessToken) {
    try {
      const ckecked = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
      return ckecked;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(refreshToken) {
    try {
      const verified = jwt.verify(refreshToken, process.env.JWT_REFRES_SECRET);

      return verified;
    } catch (e) {
      return null;
    }
  }

  async findToken(refreshToken) {
    const tokenDate = await tokenModel.findOne({ refreshToken });
    return tokenDate;
  }

  async removetoken(refreshToken) {
    const tokenData = await tokenModel.deleteOne({
      refreshToken,
    });
    return tokenData;
  }
}

module.exports = new TokenService();
