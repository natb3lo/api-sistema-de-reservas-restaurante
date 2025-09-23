const hash = require("../utils/hash");

const hashPassword = async (req, res, next) => {
  try {
    const hashedPassword = await hash(req.body.password);
    req.body.password = hashedPassword;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Ooops...something went wrong :(" });
  }
};

module.exports = hashPassword;
