const authorize = (allowedRoles = new Set()) => {
  return (req, res, next) => {
    const user = req.user;
    if (!allowedRoles.has(user.role)) {
      return res.status(401).json({ error: "Access denied" });
    }
    next();
  };
};

module.exports = authorize;
