const cors = require("cors");
const express = require("express");
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());


// Routes principales
app.use("/api/restaurants", require("../server/routes/restaurants"));

app.use("/api/menus", require("../server/routes/menus"));

app.use("/restaurants", express.static("public/restaurants"));
// Lancer le serveur
const port = 3001;

app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
});
