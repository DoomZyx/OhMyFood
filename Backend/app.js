const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("./connection/connection");


const restaurantsRoutes = require("./routes/restaurants");
const menusRoutes = require("./routes/menus");

const profileRoute = require('./routes/user');
const userRoutes = require("./routes/auth");

const cartRoutes = require('./routes/cart');

const app = express();

const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.1.17:5173"], 
  })
);

app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));


app.use("/api/restaurants", restaurantsRoutes);

app.use("/api/menus", menusRoutes);

app.use("/api/", userRoutes);
app.use("/api/", profileRoute);


app.use('/api/cart', cartRoutes);

module.exports = app;