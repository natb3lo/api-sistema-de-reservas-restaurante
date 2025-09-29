const { findUsers } = require("../services/userService");

const getUsers = async (req, res) => {
  try {
    const users = await findUsers();
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ooops...something went wrong" });
  }
};

module.exports = getUsers;
