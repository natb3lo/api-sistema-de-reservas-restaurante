const { signToken } = require("../utils/token");

const generateToken = async (req, res) => {
  const { id, name, email, role } = req.user;
  try {
    const token = signToken({ id: id });
    return res.status(201).json({
      user: {
        id,
        name,
        email,
        role,
      },
      token,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Ooops...something went wrong :(" });
  }
};

module.exports = generateToken;
