const express = require("express");
const { authenticate } = require("../middlewares/authMiddleware");
const {
  getTables,
  createRestaurantTable,
} = require("../controllers/tableController");
const authorize = require("../middlewares/authorization");
const {
  validateCreateTableFields,
  validateResult,
} = require("../middlewares/validations");
const router = express.Router();

// GET: /tables
router.get("/", authenticate, getTables);

// POST: /tables - Priviledged access route(Admin)
router.post(
  "/",
  validateCreateTableFields,
  validateResult,
  authenticate,
  authorize(new Set(["ADMIN"])),
  createRestaurantTable
);

module.exports = router;
