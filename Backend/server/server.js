const cors = require("cors");
const express = require("express");
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.1.17:5173"], // Autorise localhost et IP locale
  })
);

app.use(express.json());

// Routes principales
app.use("/api/restaurants", require("./routes/restaurants"));

app.use("/api/menus", require("./routes/menus"));

app.use("/restaurants", express.static("public/restaurants"));

app.listen(4000, "0.0.0.0", () => {
  console.log("Serveur en écoute sur le port 4000");
});
