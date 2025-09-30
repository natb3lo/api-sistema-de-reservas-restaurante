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
    //console.log(error.message);
    return next(
      new AppError("Token generation failed", 500, "TOKEN_ERROR", [
        {
          field: null,
          message: "An unexpected error occurred while generating the token",
        },
      ])
    );
  }
};

module.exports = generateToken;
