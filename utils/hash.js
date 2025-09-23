const bcrypt = require("bcrypt");

const hash = async (plainTextPassword) => {
  const saltRounds = 11;
  try {
    return await bcrypt.hash(plainTextPassword, saltRounds);
  } catch (error) {
    throw new Error(`Some error ocurred hashing the password: ${error}`);
  }
};

module.exports = hash;
