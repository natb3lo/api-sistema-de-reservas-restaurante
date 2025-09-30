const { findUsers } = require("../services/userService");

const getUsers = async (req, res, next) => {
  try {
    const users = await findUsers();
    return res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

module.exports = getUsers;
