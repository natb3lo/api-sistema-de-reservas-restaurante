const { body } = require("express-validator");
const {
  createUser,
  findUserByEmail,
  findUserById,
} = require("../services/userService");
const { comparePassword, hash } = require("../utils/hash");
const { verifyToken } = require("../utils/token");

const registerValidatonFields = [
  body("name").notEmpty().withMessage("You must provide a name"),
  body("email")
    .notEmpty()
    .withMessage("You must provide an e-mail address")
    .isEmail()
    .withMessage("Not a valid e-mail address"),
  body("password")
    .notEmpty()
    .withMessage("You must provide a password")
    .isLength({ min: 5 })
    .withMessage("Password must have at least 5 characters"),
  body("passwordConfirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

const loginValidatonFields = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(400).json({
      error:
        "[AUTH_ERROR] Missing Authorization header. Use: Basic Auth <base64>",
    });
  }
  if (!authHeader.startsWith("Basic ")) {
    return res.status(400).json({
      error:
        "[AUTH_ERROR] Invalid Authorization header. Use: Basic Auth <base64>",
    });
  }

  const [, hash] = authHeader.split(" ");
  const [email, password] = Buffer.from(hash, "base64").toString().split(":");

  req.auth = { email, password };

  next();
};

const userAuthentication = async (req, res, next) => {
  const { email, password } = req.auth;

  try {
    const user = await findUserByEmail(email, password);
    const isMatch = comparePassword(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ error: "[AUTH_ERROR] Invalid credentials" });
    }
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ error: error.message });
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
    //console.log(error);
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
};

const authenticate = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  //console.log(authHeader);
  if (!authHeader) {
    return res.status(401).json({ error: "No Authorization header" });
  }
  const [scheme, token] = authHeader.split(" ");
  //console.log(token);
  try {
    const decode = await verifyToken(token);
    //console.log(decode);
    const userId = decode.id;
    //console.log(userId);
    const user = await findUserById(userId);
    req.user = user;
    next();
    /** 
     * 
    return res.status(201).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
    */
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Invalid Token" });
  }
};

module.exports = {
  registerValidatonFields,
  loginValidatonFields,
  userAuthentication,
  userRegistration,
  authenticate,
};
