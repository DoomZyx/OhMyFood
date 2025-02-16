const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("./connection/connection");

const restaurantsRoutes = require("./routes/restaurants");
const menusRoutes = require("./routes/menus");

const userRoutes = require("./routes/auth");

const app = express();

const cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.1.17:5173"], 
  })
);

app.use(bodyParser.json());

app.use("/api/restaurants", restaurantsRoutes);
app.use("/api/menus", menusRoutes);
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;