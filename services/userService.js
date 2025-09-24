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
    //console.log(error);
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

module.exports = { createUser, findUserByEmail };
