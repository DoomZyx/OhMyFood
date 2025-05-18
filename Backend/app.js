const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("./connection/connection");



const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://192.168.1.17:5173",
      `http://${process.env.IP_FIXE}:5173`,
    ],
  })
);

const restaurantsRoutes = require("./routes/restaurants");
const menusRoutes = require("./routes/menus");

const profileRoute = require("./routes/user");
const userRoutes = require("./routes/auth");

const cartRoutes = require("./routes/cart");
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/restaurants", restaurantsRoutes);

app.use("/api/menus", menusRoutes);

app.use("/api/", userRoutes);

app.use("/api/", profileRoute);

app.use('/api/cart', cartRoutes);

module.exports = app;