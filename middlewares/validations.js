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

const validateRegisterFields = [
  body("name").notEmpty().withMessage("You must provide a name"),
  body("email")
    .notEmpty()
    .withMessage("You must provide an e-mail address")
    .isEmail()
    .withMessage("Not a valid e-mail address"),
  body("password")
    .notEmpty()
    .withMessage("You must provide a password")
    .isLength({ min: 5 })
    .withMessage("Password must have at least 5 characters"),
  body("passwordConfirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

const validateLoginFields = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader) {
    return res.status(400).json({
      error:
        "[AUTH_ERROR] Missing Authorization header. Use: Basic Auth <base64>",
    });
  }
  if (!authHeader.startsWith("Basic ")) {
    return res.status(400).json({
      error:
        "[AUTH_ERROR] Invalid Authorization header. Use: Basic Auth <base64>",
    });
  }

  const [, hash] = authHeader.split(" ");
  console.log(hash);
  const [email, password] = Buffer.from(hash, "base64").toString().split(":");
  console.log("email: " + email + " password: " + password);

  req.auth = { email, password };

  next();
};

module.exports = {
  validateCreateTableFields,
  validateResult,
  validateUpdateTableFields,
  validateRegisterFields,
  validateLoginFields,
};
