const express = require("express");
const { authenticate } = require("../middlewares/authMiddleware");
const getTables = require("../controllers/tableController");
const router = express.Router();

// GET: /tables
router.get("/", authenticate, getTables);

module.exports = router;
