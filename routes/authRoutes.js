const express = require("express");
const {
  userAuthentication,
  userRegistration,
  registerValidatonFields,
  loginValidatonFields,
} = require("../middlewares/authMiddleware");
const { validateResult } = require("../middlewares/validations");
const generateToken = require("../middlewares/generateToken");
const router = express.Router();

// GET: /auth/login
router.get("/login", loginValidatonFields, userAuthentication, generateToken);

// POST: /auth/register
router.post(
  "/register",
  registerValidatonFields,
  validateResult,
  userRegistration,
  generateToken
);

module.exports = router;
