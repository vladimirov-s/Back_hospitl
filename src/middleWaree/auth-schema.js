const { body } = require("express-validator");

module.exports = [
  body("name").notEmpty(),
  body("password").isLength({ min: 6, max: 10 }),
];
