const express = require("express");
const {
  userAuthentication,
  userRegistration,
} = require("../middlewares/authMiddleware");
const {
  validateResult,
  validateLoginFields,
  validateRegisterFields,
} = require("../middlewares/validations");
const generateToken = require("../middlewares/generateToken");
const router = express.Router();

// GET: /auth/login
router.get("/login", validateLoginFields, userAuthentication, generateToken);

// POST: /auth/register
router.post(
  "/register",
  validateRegisterFields,
  validateResult,
  userRegistration,
  generateToken
);

module.exports = router;
