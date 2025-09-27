const { body } = require("express-validator");
const { validationResult } = require("express-validator");
const TableStatus = require("../enums/tableStatus");

const validateCreateTableFields = [
  body("number")
    .notEmpty()
    .withMessage("You must provide a number for the Table")
    .isNumeric()
    .withMessage("Only numbers are allowed for Table numbers"),
  body("capacity")
    .notEmpty()
    .withMessage("You must provide a capacity number for the table")
    .isNumeric()
    .withMessage("Only numbers are allowed for capacity table numbers"),
];

const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

const validateUpdateTableFields = [
  body("capacity")
    .notEmpty()
    .withMessage("You must provide a new capacity number for the table")
    .isNumeric()
    .withMessage("Only numbers are allowed for capacity table numbers"),
  body("status")
    .notEmpty()
    .withMessage("You must provide a table status")
    .custom((value) => {
      console.log(value);
      if (
        value !== TableStatus.AVAILABLE &&
        value !== TableStatus.RESERVED &&
        value !== TableStatus.UNAVAILABLE
      ) {
        throw new Error("Invalid Table status");
      }
      return true;
    }),
];

module.exports = {
  validateCreateTableFields,
  validateResult,
  validateUpdateTableFields,
};
