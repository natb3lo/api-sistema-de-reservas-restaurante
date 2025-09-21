const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const { dbConnect } = require("../config/db");

// ---------- Database Connection ----------
// Establishes connection with the PostgreSQL database
dbConnect();

// ---------Middlewares---------
// Built-in middleware to parse JSON request bodies
app.use(express.json());

// ---------Routes-------------
// Root endpoint: GET /
app.use("/", async (req, res) => {
  res
    .status(200)
    .json({ msg: "Welcome to RESTAURANT SYSTEM RESERVATION API!" });
});

// --------Server Startup------
// Starts the Express server on the specified port
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});
