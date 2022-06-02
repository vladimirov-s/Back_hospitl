const { body } = require("express-validator");

module.exports = [
  body("customer")
    .matches(/^[а-яА-Яa-zA-Z\s]{4,30}$/)
    .withMessage("Fill normal characters, lenght between 4-30"),
  body("doctor")
    .matches(/^[а-яА-Яa-zA-Z\s]{4,30}$/)
    .withMessage(
      "Bad charachters. You can use cirillic and litin and space between 4-30 symbols"
    ),
  body("date")
    .matches(/^20[\d]{2}-[\d]{2}-[\d]{2}$/)
    .withMessage("Bad charachters. Date must be in format YYYY-MM-DD"),
  body("complaint")
    .matches(/^[а-яА-Яa-zA-Z\s,.]{6,80}$/)
    .withMessage(
      "Bad charachters. You can use cirillic and litin space dot comma between 6-80 symbols"
    ),
];
