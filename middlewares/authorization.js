const AppError = require("../exceptions/AppError");

const authorize = (allowedRoles = new Set()) => {
  return (req, res, next) => {
    const user = req.user;
    if (!allowedRoles.has(user.role)) {
      return next(
        new AppError("Access denied", 401, "AUTH_ERROR", [
          {
            field: "role",
            message: `Role '${user.role}' does not have access.`,
          },
        ])
      );
    }
    next();
  };
};

module.exports = authorize;
