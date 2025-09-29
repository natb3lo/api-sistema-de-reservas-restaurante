const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const { dbConnect } = require("../config/db");
const authRouter = require("../routes/authRoutes");
const userRouter = require("../routes/userRoutes");
const tableRouter = require("../routes/tableRoutes");
const reservationRouter = require("../routes/reservationRoutes");
const errorHandler = require("../middlewares/errorHandler");

// ---------- Database Connection ----------
// Establishes connection with the PostgreSQL database
dbConnect();

// Built-in middleware to parse JSON request bodies
app.use(express.json());

// ---------Routes-------------
// Root endpoint: GET /
app.get("/", async (req, res) => {
  res
    .status(200)
    .json({ msg: "Welcome to RESTAURANT SYSTEM RESERVATION API!" });
});

// Auth endpoint: /auth
app.use("/auth", authRouter);

// Users endpoint: /users
app.use("/users", userRouter);

// Tables endpoint: /tables
app.use("/tables", tableRouter);

// Reservations endpoint: /reservations
app.use("/reservations", reservationRouter);

// Global error handler
app.use(errorHandler);

// --------Server Startup------
// Starts the Express server on the specified port
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});
