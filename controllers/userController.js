const User = require("../models/user");
const { createUser } = require("../services/userService");

const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await createUser(name, email, password);
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    next();
  } catch (error) {
    //console.log(error);
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser };
