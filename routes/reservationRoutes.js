const express = require("express");
const { authenticate } = require("../middlewares/authMiddleware");
const {
  validateMakeTableReservationFields,
  validateResult,
  validateRegisterReservationFields,
} = require("../middlewares/validations");
const {
  registerReservation,
  getReservations,
} = require("../controllers/reservationController");
const router = express.Router();

router.get("/", authenticate, getReservations);

// POST: /reservations
router.post(
  "/",
  validateRegisterReservationFields,
  validateResult,
  authenticate,
  registerReservation
);

module.exports = router;
