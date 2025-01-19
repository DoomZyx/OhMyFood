const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "../database/restaurants.db")

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err.message);
  } else {
    console.log("Connecté à la base de données SQLite.");
  }
});

// Définir le chemin absolu vers la base de données
const dbm = new sqlite3.Database(path.join(__dirname, "../database/menus.db"), (err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err.message);
  } else {
    console.log("Connecté à la base de données SQLite.");
  }
});

module.exports = db;
module.exports = dbm;
