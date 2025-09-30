const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;

  //Logs
  console.error(
    `[${new Date().toISOString()}] ERROR: ${err.code || "INTERNAL_ERROR"}`
  );
  console.error(`Route: ${req.originalUrl}`);
  console.error(`Status: ${status}`);
  console.error(`Message: ${err.message}`);
  if (err.details)
    console.error(`Details: ${JSON.stringify(err.details, null, 2)}`);
  console.error(err.stack);

  res
    .status(status)
    .type("application/problem+json")
    .json({
      type: `http://localhost:${process.env.PORT}/probs/${
        err.code || "internal-error"
      }`,
      title:
        err.code === "VALIDATION_ERROR"
          ? "Invalid request parameters."
          : "An unexpected error ocurred.",
      status: status,
      detail: err.message,
      instance: req.originalUrl,
      ...(err.details ? { errors: err.details } : {}),
    });
};

module.exports = errorHandler;
