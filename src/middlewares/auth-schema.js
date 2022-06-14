const { body } = require("express-validator");

module.exports = [
  body("name")
    .matches(/[a-zA-Z-.]{6,20}/)
    .withMessage("Fill normal characters, lenght between 6-20"),
  body("password")
    .matches(/[a-zA-Z0-9.,?@#$^&]{6,10}/)
    .withMessage(
      "Bad charachters. You can use a-zA-Z0-9.,?@#$^& between 6-10 symbols"
    ),
];
