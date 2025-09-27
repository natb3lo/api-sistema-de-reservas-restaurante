const express = require("express");
const { getUser } = require("../controllers/userController");
const { authenticate } = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorization");
const Roles = require("../enums/roles");
const getUsers = require("../controllers/userController");
const router = express.Router();

// GET: /users/me
router.get("/me", authenticate, (req, res) => {
  return res.status(200).json({
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
});

// GET: /users - Priviledged access route(Admin)
router.get("/", authenticate, authorize(new Set(["ADMIN"])), getUsers);

module.exports = router;
