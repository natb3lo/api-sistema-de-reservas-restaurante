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
    }
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    next();
  } catch (error) {
    return next(
      new AppError("Invalid credentials", 401, "AUTH_ERROR", [
        {
          field: "email/password",
          message: "The provided credentials are incorrect.",
        },
      ])
    );
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
    if (error.message.includes("Email already registered")) {
      return next(
        new AppError("User registration failed", 400, "USER_ERROR", [
          {
            field: "email",
            message: "Email already registered.",
          },
        ])
      );
    }
    return next(
      new AppError("User registration failed", 400, "USER_ERROR", [
        {
          field: null,
          message: "An unexpected error ocurred while creating the user",
        },
      ])
    );
  }
};

const authenticate = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return next(
      new AppError("User authentication failed", 401, "AUTH_ERROR", [
        {
          field: "authorization",
          message: "No Bearer Token provided.",
        },
      ])
    );
  }
  const [scheme, token] = authHeader.split(" ");
  try {
    const decode = await verifyToken(token);
    const userId = decode.id;
    const user = await findUserById(userId);
    req.user = user;
    next();
  } catch (error) {
    return next(
      new AppError("User authentication failed", 401, "AUTH_ERROR", [
        {
          field: "authorization",
          message: "Invalid token.",
        },
      ])
    );
  }
};

module.exports = {
  userAuthentication,
  userRegistration,
  authenticate,
};
