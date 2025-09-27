const { body } = require("express-validator");
const { validationResult } = require("express-validator");

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

module.exports = { validateCreateTableFields, validateResult };
