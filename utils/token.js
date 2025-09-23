const jwt = require("jsonwebtoken");

const signToken = async (payload, expiresIn = "4h") => {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn,
    });
  } catch (error) {
    throw new Error("Error generating token");
  }
};

const verifyToken = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.log(`Error generating token: ${error}`);
    return res.status(500).json({ msg: "Ooops...something went wrong :(" });
  }
};

module.exports = { signToken, verifyToken };
