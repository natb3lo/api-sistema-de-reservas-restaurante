const { body, validationResult } = require("express-validator");
const TableStatus = require("../enums/tableStatus");
const AppError = require("../exceptions/AppError");
const express = require("express");
const app = express();

app.use(express.json()); // 🔹 MUITO IMPORTANTE

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
    const formattedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));
    //console.log(formattedErrors);
    return next(
      new AppError(
        "Validation failed",
        400,
        "VALIDATION_ERROR",
        formattedErrors
      )
    );
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
  body("name").notEmpty().withMessage("You must provide a name."),
  body("email")
    .notEmpty()
    .withMessage("You must provide an e-mail address.")
    .isEmail()
    .withMessage("Not a valid e-mail address."),
  body("password")
    .notEmpty()
    .withMessage("You must provide a password.")
    .isLength({ min: 5 })
    .withMessage("Password must have at least 5 characters."),
  body("passwordConfirmation")
    .notEmpty()
    .withMessage("You must confirm your password.")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match.");
      }
      return true;
    }),
];

const validateRegisterReservationFields = [
  body("tableNumber")
    .notEmpty()
    .withMessage("You must provide the table number")
    .isNumeric()
    .withMessage("Only numeric values are allowed"),

  body("date")
    .notEmpty()
    .withMessage("You must provide a reservation date")
    .matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/)
    .withMessage("Date must be in YYYY-MM-DD format"),

  body("hour")
    .notEmpty()
    .withMessage("You must provide a reservation hour")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("Hour must be in HH:MM format")
    .custom((v) => {
      const [hour, minutes] = v.split(":").map(Number);
      if (hour >= 22 || hour < 9) {
        throw new Error(
          "Reservations are only allowed between 09:00 and 22:00"
        );
      }

      return true;
    }),

  body("duration")
    .notEmpty()
    .withMessage("You must provide a duration")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("Duration must be in HH:MM format"),

  body("numberOfPeople")
    .notEmpty()
    .withMessage("You must provide the number of people")
    .isInt({ min: 1 })
    .withMessage("Number of people must be a positive integer"),
];

const validateLoginFields = (req, res, next) => {
  const authHeader = req.headers.authorization;
  //console.log(authHeader);
  if (!authHeader) {
    return next(
      new AppError("Login validation failed", 400, "AUTH_ERROR", [
        {
          field: "authorization",
          message: "Authorization is required. Use: Basic <base64>.",
        },
      ])
    );
    /**
     * 
    return res.status(400).json({
      error:
      "[AUTH_ERROR] Missing Authorization header. Use: Basic Auth <base64>",
    });
    */
  }
  if (!authHeader.startsWith("Basic ")) {
    return next(
      new AppError("Login validation failed", 400, "AuUTH_ERROR", [
        {
          field: "authorization",
          message: "Authorization header must start with 'Basic '",
        },
      ])
    );
    /**
     * 
    return res.status(400).json({
      error:
      "[AUTH_ERROR] Invalid Authorization header. Use: Basic Auth <base64>",
    });
    */
  }

  const [, hash] = authHeader.split(" ");
  console.log(hash);
  const [email, password] = Buffer.from(hash, "base64").toString().split(":");
  //console.log("email: " + email + " password: " + password);
  if (!email || !password) {
    return next(
      new AppError("Login validation failed", 400, "AUTH_ERROR", [
        {
          field: "authorization",
          message: "Email or password is missing in Basic Auth.",
        },
      ])
    );
  }

  req.auth = { email, password };

  next();
};

module.exports = {
  validateCreateTableFields,
  validateResult,
  validateUpdateTableFields,
  validateRegisterFields,
  validateLoginFields,
  validateRegisterReservationFields,
};
