const User = require("../models/user");

const createUser = async (name, email, password) => {
  const userExist = await User.findOne({ where: { email: email } });
  if (userExist) {
    throw new Error("Email already registered");
  }
  try {
    const user = await User.create({
      name: name,
      email: email,
      password: password,
    });
    return user;
  } catch (error) {
    throw new Error(`Error creating an User`);
  }
};

const findUserByEmail = async (email, password) => {
  const userExist = await User.findOne({ where: { email: email } });
  if (!userExist) {
    throw new Error("[AUTH_ERROR] Invalid credentials");
  }
  return userExist;
};

const findUserById = async (id) => {
  const userExist = await User.findOne({
    where: { id: id },
    attributes: { exclude: ["password"] },
  });
  if (!userExist) {
    throw new Error();
  }

  return userExist;
};

const findUsers = async () => {
  try {
    return await User.findAll({
      attributes: { exclude: ["password"] },
    });
  } catch (error) {
    throw new Error("Error getting users");
  }
};

module.exports = { createUser, findUserByEmail, findUserById, findUsers };
