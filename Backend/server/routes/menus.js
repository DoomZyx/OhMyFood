const express = require("express");
const router = express.Router();
const db = require("../database/db");

// Récupérer tous les menus
router.get("/", (req, res) => {
  db.all("SELECT * FROM menus", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Récupérer les menus d'un restaurant spécifique par ID
router.get("/:restaurantId", (req, res) => {
  const { restaurantId } = req.params;
  db.all(
    "SELECT * FROM menus WHERE restaurant_id = ?",
    [restaurantId],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (rows.length > 0) {
        res.json(rows);
      } else {
        res
          .status(404)
          .json({ message: "Aucun menu trouvé pour ce restaurant." });
      }
    }
  );
});

module.exports = router;
