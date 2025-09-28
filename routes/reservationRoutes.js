const express = require("express");
const { authenticate } = require("../middlewares/authMiddleware");
const {
  validateMakeTableReservationFields,
  validateResult,
  validateRegisterReservationFields,
} = require("../middlewares/validations");
const registerReservation = require("../controllers/reservationController");
const router = express.Router();

router.post(
  "/",
  validateRegisterReservationFields,
  validateResult,
  authenticate,
  registerReservation
);

module.exports = router;
