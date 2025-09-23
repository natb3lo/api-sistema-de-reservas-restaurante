const express = require("express");
const { registerValidator } = require("../middlewares/authMiddleware");
const validateResult = require("../middlewares/validateResult");
const hashPassword = require("../middlewares/hashPassword");
const generateToken = require("../middlewares/generateToken");
const { registerUser } = require("../controllers/userController");
const router = express.Router();

//router.get("/login");

// POST: /auth/register
router.post(
  "/register",
  registerValidator,
  validateResult,
  hashPassword,
  registerUser,
  generateToken
);

module.exports = router;
