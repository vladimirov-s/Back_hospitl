const jwt = require("jsonwebtoken");
const { secret } = require("./../../config");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(403).json({ data: "Вы не авторизованы" });
    }

    const decodedData = jwt.verify(token, secret);
    req.user = decodedData;
    next();
  } catch (err) {
    console.log(err);
    return res.status(403).json({ data: "Вы не авторизованы" });
  }
};
