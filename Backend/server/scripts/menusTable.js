const db = require("../databse/db");

db.serialize(() => {
 db.run(`CREATE TABLE IF NOT EXISTS menus (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  restaurant_id INTEGER NOT NULL,
  ordre TEXT,
  name TEXT,
  namesuite TEXT,
  price REAL,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
  )`)
  db.run(`INSERT INTO menus (ordre, name, namesuite, price) VALUES
  (1, 'ENTREES', 'Fricassée d'escargot', 'Au piment d'espelette', 25€ ),
  (1, 'ENTREES', 'Foie gras de canard mi-cuit', 'Et ses copeaux de truffe noir', 35€),
  (1, 'ENTREES', 'Oeuf au plat', 'Assaisonné à la truffe sur lit de caviar', 20€),
  (1, 'PLATS', 'Filet de boeuf aux herbes', 'Accompagné de sa ribambelle de légumes', 40€),
  (1, 'PLATS', 'Parmentier de queue de boeuf', 'A la truffe noir sur sa purée de panais', 35€),
  (1, 'PLATS', 'Filet de turbot', 'Aux agrumes', 44€),
  (1, 'DESSERTS', 'Paris-Brest', 'revisité', 18€),
  (1, 'DESSERTS', 'Macaron au chocolat d'exception', 'Et glace à la vanille de Madagascar' 22€,),
  (1, 'DESSERTS', 'Mousse au chocolat', 'Au piment d'espelette et à la truffe noir',),
  (2, 'ENTREES', 'Ravioles de foie gras', 'Accompagnés de leur crème à la truffe', 25€),
  (2, 'ENTREES', 'Caviar osciètre', 'Sur blini à la farine de blé noir', 35€),
  (2, 'ENTREES', 'Homard et espuma de potiron', 'Marine aux zestes d'orange', 20€),
  (2, 'ENTREES', 'Foie gras de canard cuit entier ', 'Confiture de figue et pain toasté', 35€),
  (2, 'PLATS', 'Noix de coquilles Saint-Jacques', 'Sur lit de purée de céleri-rave', 40€),
  (2, 'PLATS', 'Langoustine poêlée', 'Purée de patate douce', 35€),
  (2, 'PLATS', 'Mijoté de queue de boeuf', 'Et riz sauvage aux zestes de citron', 44€),
  (2, 'DESSERTS', 'Macaron noisette et chocolat', 'Glace au caramel brun et sel de Guérande', 18€),
  (2, 'DESSERTS', 'Baba au rhum revisité', 'Avec so coulis de citron', 22€),
  (2, 'DESSERTS', 'Tarte au citron meringuée', 'Déstructurée', 23€),
  (3, 'ENTREES', 'Tartare de poulpe acidulé', 'Aux zestes d'orange', 25€),
  (3, 'ENTREES', 'Velouté de légumes d'antan', 'Carotte, panais, topinambour', 35€),
  (3, 'ENTREES', 'Soupe à l'oignon', 'Revisitée', 20€),
  (3, 'PLATS', 'Coquilles Saint-Jacques', 'Accompagnées d'une purée de panais', 40€),
  (3, 'PLATS', 'Magret de canard', 'Et parmentier de pommes de terre', 35€),
  (3, 'PLATS', 'Pigeonneau d’Ille-et-Vilaine', 'Sur son lit de gnocchis aux légumes', 44€),
  (3, 'DESSERTS', 'Pétales de violettes glacés', 'Et purée de noisettes', 18€),
  (3, 'DESSERTS', 'Fondant au chocolat', 'Revisitée', 22€),
  (3, 'DESSERTS', 'Millefeuille croustillant', 'Myrtilles et pâte d’amande', 23€),
  (4, 'ENTREES', 'Tartare de thon', 'Assaisonné au yuzu', 25€),
  (4, 'ENTREES', 'Bouchée de homard croustillant', 'Et sa farandole de petits légumes', 35€),
  (4, 'ENTREES', 'Velouté de cèpes', 'AUx truffes', 20€),
  (4, 'PLATS', 'Poulet rôti aux herbes de Provence', 'Et sa crème de truffe', 40€),
  (4, 'PLATS', 'Langouste rôtie', 'Et ses légumes de saison', 35€),
  (4, 'PLATS', 'Côte de boeuf Angus', 'Et sa purée de panais', 44€),
  (4, 'DESSERTS', 'Farandole de desserts', 'Du chef', 18€),
  (4, 'DESSERTS', 'Crème brulée', 'Revisitée', 22€),
  (4, 'DESSERTS', 'Tiramisu', 'À la noisette', 23€)`);
  console.log('Table menus et données ajoutés avec succés')
});

db.close();
