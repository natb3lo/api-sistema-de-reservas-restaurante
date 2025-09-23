const { body } = require("express-validator");

const registerValidator = [
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

module.exports = { registerValidator };
