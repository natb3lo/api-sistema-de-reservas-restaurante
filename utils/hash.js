const bcrypt = require("bcrypt");

const hash = async (plainTextPassword) => {
  const saltRounds = 11;
  try {
    return await bcrypt.hash(plainTextPassword, saltRounds);
  } catch (error) {
    throw new Error(`Some error ocurred hashing the password: ${error}`);
  }
};

const comparePassword = async (plainTextPassword, hashedPassword) => {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

module.exports = { hash, comparePassword };
