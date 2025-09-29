const {
  createUser,
  findUserByEmail,
  findUserById,
} = require("../services/userService");
const { comparePassword, hash } = require("../utils/hash");
const { verifyToken } = require("../utils/token");
const AppError = require("../exceptions/AppError");

const userAuthentication = async (req, res, next) => {
  const { email, password } = req.auth;

  try {
    const user = await findUserByEmail(email);
    //console.log(user);
    //console.log("provided: " + password + "compared: " + user.password);
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return next(
        new AppError("Invalid credentials", 401, "AUTH_ERROR", [
          {
            field: "email/password",
            message: "The provided credentials are incorrect.",
          },
        ])
      );
      /** 
       * 
      return res
      .status(401)
      .json({ error: "[AUTH_ERROR] Invalid credentials" });
      */
    }
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    next();
  } catch (error) {
    //console.log(error.message);
    return next(
      new AppError("Invalid credentials", 401, "AUTH_ERROR", [
        { field: "email", message: "No user found with this email" },
      ])
    );
    //return res.status(401).json({ error: error.message });
  }
};

const userRegistration = async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashedPassword = await hash(password);
  try {
    const user = await createUser(name, email, hashedPassword);
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
};

const authenticate = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "No Authorization header" });
  }
  const [scheme, token] = authHeader.split(" ");
  try {
    const decode = await verifyToken(token);
    const userId = decode.id;
    const user = await findUserById(userId);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Invalid Token" });
  }
};

module.exports = {
  userAuthentication,
  userRegistration,
  authenticate,
};
