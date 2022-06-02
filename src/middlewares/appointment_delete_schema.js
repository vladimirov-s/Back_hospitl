const { body } = require("express-validator");

module.exports = [
  body("appointId")
    .matches(/^[a-z\d]{24}$/)
    .withMessage("incorrect info about the goal"),
];
