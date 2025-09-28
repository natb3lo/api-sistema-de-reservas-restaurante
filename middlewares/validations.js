const { body } = require("express-validator");
const { validationResult } = require("express-validator");
const TableStatus = require("../enums/tableStatus");
const {
  parseReservationDateTime,
  parseBrazilianDate,
  parseDateToUTC,
  parseToLocalDate,
} = require("../utils/parseDate");

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
    .withMessage("Hour must be in HH:MM format"),

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

/** 
 * 
const validateDate = (req, res, next) => {
  const dateUTC = parseDateToUTC(req.body.date, req.body.hour);
  //const [year, month, day] = req.body.reservationDate.split("-");
  //const [hour, minute] = req.body.reservationHour.split(":");
  //console.log(hour);
  const { reservationDate, reservationHour } = req.body;
  console.log("reservation date: " + reservationDate);
  console.log("reservation hour: " + reservationHour);
  parseBrazilianDate(reservationDate);
  req.body.DateUTC = dateUTC;
  //const reservationDateUTC = req.body.reservationDate;
  //console.log(dateUTC);
  //const localDate = parseToLocalDate(dateUTC);
  //console.log(localDate);
  next();
};
*/

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
  validateRegisterReservationFields,
};
