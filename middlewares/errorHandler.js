const errorHandler = (err, req, res, next) => {
  console.log(err);

  if (err.isOperational) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  res.status(500).json({ error: "Internal Server Error" });
};

module.exports = errorHandler;
