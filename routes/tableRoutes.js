const express = require("express");
const { authenticate } = require("../middlewares/authMiddleware");
const {
  getTables,
  createRestaurantTable,
  updateRestaurantTable,
  deleteRestauranteTable,
} = require("../controllers/tableController");
const authorize = require("../middlewares/authorization");
const {
  validateCreateTableFields,
  validateResult,
  validateUpdateTableFields,
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

// PATCH: /tables - Priviledged access route(Admin)
router.patch(
  "/:number",
  validateUpdateTableFields,
  validateResult,
  authenticate,
  authorize(new Set(["ADMIN"])),
  updateRestaurantTable
);

// DELETE:: /tables/{number}
router.delete(
  "/:number",
  authenticate,
  authorize(new Set(["ADMIN"])),
  deleteRestauranteTable
);

module.exports = router;
