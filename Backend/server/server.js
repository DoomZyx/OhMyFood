const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());

app.use(express.json());
app.use("/restaurants", express.static("public/restaurants"));

// Routes principales
app.use("/api/restaurants", require("../server/routes/restaurants"));

// app.use('api/menus', require('./routes/menus'));

// Lancer le serveur
const port = 3001;

app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
});
