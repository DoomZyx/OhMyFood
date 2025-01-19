const db = require('../database/db');

db.serialize(() => {
  // Créer la table des restaurants
  db.run(`CREATE TABLE IF NOT EXISTS restaurants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    lieu TEXT NOT NULL
  )`);

  // Ajouter des données + Ajout des photos directement dans la db 
  db.run(`INSERT INTO restaurants (name, lieu) VALUES
    ('La palette du goût', 'Ménilmontant'),
    ('La note enchantée', 'Charonne'),
    ('À la française', 'Cité Rouge'),
    ('Le délice des sens', 'Folie-Méricourt')`);

  console.log('Table "restaurants" créée et données ajoutées.');
});

db.close();
