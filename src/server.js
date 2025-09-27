const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const { dbConnect } = require("../config/db");
const authRouter = require("../routes/authRoutes");
const userRouter = require("../routes/userRoutes");

// ---------- Database Connection ----------
// Establishes connection with the PostgreSQL database
dbConnect();

// ---------Middlewares---------
// Built-in middleware to parse JSON request bodies
app.use(express.json());

// --------Server Startup------
// Starts the Express server on the specified port
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});

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
