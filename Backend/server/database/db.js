const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./restaurants.db", (err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err.message);
  } else {
    console.log("Connecté à la base de données SQLite.");
  }
});

module.exports = db;
