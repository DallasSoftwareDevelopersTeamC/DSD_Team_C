"use strict";

const express = require("express");
const app = express();
require("dotenv").config({ path: "../.env" });
const cors = require("cors");
const cookieParser = require("cookie-parser");

const inventoryRoutes = require("./routes/inventoryRoutes");
const ordersRoutes = require("./routes/ordersRoutes");
const userRoutes = require("./routes/userRoutes");
const authenticationRoutes = require("./routes/authenticationRoutes");
const settingsRoutes = require("./routes/settingsRoutes");

// Configure CORS options
const corsOptions = {
  origin: process.env.CORS_ORIGIN, // Use the environment variable
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Use the CORS middleware with the specified options
app.use(cors(corsOptions));

// allowing express to read incoming json data
app.use(express.json());

// allowing express to read urlencoded data
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  next();
});

app.use(cookieParser());

// Routes
app.use("/inventory", inventoryRoutes);
app.use("/orders", ordersRoutes);
app.use("/user", userRoutes);
app.use("/authentication", authenticationRoutes);
app.use("/settings", settingsRoutes);
app.use("/uploads", express.static("settingsRoutes"));

app.listen(process.env.PORT, () => {
  console.log("server is running on port:", process.env.PORT);
});
