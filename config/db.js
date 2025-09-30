const { Sequelize } = require("sequelize");
const AppError = require("../exceptions/AppError");

const sequelize = new Sequelize(
  `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
);

const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      `[${new Date().toISOString()}] INFO: Database connection has been established successfully.`
    );
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] ERROR: DATABASE_CONNECTION_ERROR`
    );
    console.error(`Message: ${error.message}`);
    console.error(error.stack);

    throw new AppError(
      "Unable to connect to the database",
      500,
      "DATABASE_CONNECTION_ERROR",
      [
        {
          field: null,
          message: "Check database credentials or connectivity",
        },
      ]
    );
  }
};

module.exports = { dbConnect, sequelize };
