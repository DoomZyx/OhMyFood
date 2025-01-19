const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Récupérer tous les restaurants
router.get('/restaurants', (req, res) => {
  db.all('SELECT * FROM restaurants', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Récupérer un restaurant par ID
router.get('/:id', (req, res) => {
  const id = req.params.id;

  db.get('SELECT * FROM restaurants WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (row) {
      res.json(row);
    } else {
      res.status(404).json({ message: 'Restaurant non trouvé' });
    }
  });
});

module.exports = router;
