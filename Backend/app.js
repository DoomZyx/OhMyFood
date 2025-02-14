const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const restaurantsRoutes = require("./routes/restaurants");
const menusRoutes = require("./routes/menus");

mongoose
  .connect(
    "mongodb+srv://DoomZy:Biloute0310!@cluster0.9ape7.mongodb.net/ohmyfood?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

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
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;