--Créer la table category
DROP TABLE IF EXISTS category;

CREATE TABLE category (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255) NOT NULL
);

-- Insérer les 3 catégories suivantes : vêtement, voiture, autre
INSERT INTO category (name) VALUES
('vetement'),
('voiture'),
('autre');


--Créer la table tag
DROP TABLE IF EXISTS tag;

CREATE TABLE tag (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255) NOT NULL
);

-- Insérer les 3 tags suivants : neuf, occasion, autre
INSERT INTO tag (name) VALUES
('neuf'),
('occasion'),
('autre');

-- Supprimer la table si elle existe
DROP TABLE IF EXISTS ad;

-- Créer la table
CREATE TABLE ad (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  owner VARCHAR(255) NOT NULL,
  price INT NOT NULL,
  picture VARCHAR(255),
  location VARCHAR(255) NOT NULL,
  createdAt DATETIME NOT NULL,
  categoryId INTEGER NOT NULL,
  FOREIGN KEY (categoryId) REFERENCES category(id)
);

-- Insérer 20 annonces dans ces 3 villes : Bordeaux, Paris, Lyon
INSERT INTO ad (title, description, owner, price, picture, location, createdAt, categoryId) VALUES
('Vélo', 'Vélo en bon état', 'Jean', 100, 'https://www.velo.com/velo.jpg', 'Bordeaux', '2020-09-01 00:00:00', 3),
('Voiture', 'Voiture en mauvais état', 'Marie', 2000, 'https://www.voiture.com/voiture.jpg', 'Paris', '2022-09-01 00:00:00', 2),
('Ordinateur', 'Ordinateur en bon état', 'Jean', 500, 'https://www.ordinateur.com/ordinateur.jpg', 'Lyon', '2021-01-01 00:00:00', 1),
('Playstation', 'Playstation toute neuve', 'Guillaume', 450, 'https://www.playstation.com/playstation.jpg', 'Bordeaux', '2024-01-01 00:00:00', 1),
('Airpods', 'Airpods en bon état', 'Marie', 150, 'https://www.airpods.com/airpods.jpg', 'Paris', '2009-01-01 00:00:00', 1),
('Mug', 'Mug en bon état', 'Jean', 5, 'https://www.mug.com/mug.jpg', 'Lyon', '2003-01-01 00:00:00', 3),
('Téléphone', 'Téléphone en bon état', 'Jean', 300, 'https://www.telephone.com/telephone.jpg', 'Bordeaux', '2021-01-01 00:00:00', 2),
('Chargeur', 'Chargeur en bon état', 'Marie', 10, 'https://www.chargeur.com/chargeur.jpg', 'Paris', '1945-01-01 00:00:00', 2),
('Carte', 'Carte en bon état', 'Jean', 1, 'https://www.carte.com/carte.jpg', 'Lyon', '1976-01-01 00:00:00', 2),
('Lit', 'Lit en bon état', 'Jean', 200, 'https://www.lit.com/lit.jpg', 'Bordeaux', '1990-01-01 00:00:00', 2),
('Radiateur', 'Radiateur en bon état', 'Marie', 50, 'https://www.radiateur.com/radiateur.jpg', 'Paris', '2020-01-01 00:00:00', 3),
('Tapis de course', 'Tapis de course en bon état', 'Jean', 100, 'https://www.tapisdecourse.com/tapisdecourse.jpg', 'Lyon', '2000-01-01 00:00:00', 3),
('Vélo', 'Vélo en bon état', 'Jean', 100, 'https://www.velo.com/velo.jpg', 'Bordeaux', '2020-01-01 00:00:00', 1),
('Voiture', 'Voiture en mauvais état', 'Marie', 2000, 'https://www.voiture.com/voiture.jpg', 'Paris', '2005-01-01 00:00:00', 1),
('Ordinateur', 'Ordinateur en bon état', 'Jean', 500, 'https://www.ordinateur.com/ordinateur.jpg', 'Lyon', '2008-01-01 00:00:00', 1),
('Playstation', 'Playstation toute neuve', 'Guillaume', 450, 'https://www.playstation.com/playstation.jpg', 'Bordeaux', '2024-01-01 00:00:00', 1),
('Airpods', 'Airpods en bon état', 'Marie', 150, 'https://www.airpods.com/airpods.jpg', 'Paris', '2023-01-01 00:00:00', 2),
('Mug', 'Mug en bon état', 'Jean', 5, 'https://www.mug.com/mug.jpg', 'Lyon', '2002-01-01 00:00:00', 3),
('Téléphone', 'Téléphone en bon état', 'Jean', 300, 'https://www.telephone.com/telephone.jpg', 'Bordeaux', '2021-01-01 00:00:00', 3),
('Chargeur', 'Chargeur en bon état', 'Marie', 10, 'https://www.chargeur.com/chargeur.jpg', 'Paris', '1965-01-01 00:00:00', 2);


-- Supprimer la table si elle existe
DROP TABLE IF EXISTS ad_tags_tag;

-- Créer la table
CREATE TABLE ad_tags_tag (
  adId INTEGER,
  tagId INTEGER,
  FOREIGN KEY (adId) REFERENCES ad(id),
  FOREIGN KEY (tagId) REFERENCES tag(id)
);

INSERT INTO ad_tags_tag (adId, tagId) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 2),
(10, 3),
(11, 2),
(16, 1)