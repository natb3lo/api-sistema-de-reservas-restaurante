const express = require("express");
const { authenticate } = require("../middlewares/authMiddleware");
const {
  validateResult,
  validateRegisterReservationFields,
} = require("../middlewares/validations");
const {
  registerReservation,
  getReservations,
  cancelReservation,
} = require("../controllers/reservationController");
const router = express.Router();

// GET: /reservations
router.get("/", authenticate, getReservations);

// POST: /reservations
router.post(
  "/",
  validateRegisterReservationFields,
  validateResult,
  authenticate,
  registerReservation
);

//DELETE: /reservations/{id}/cancel
router.delete("/:id/cancel", authenticate, cancelReservation);

module.exports = router;
