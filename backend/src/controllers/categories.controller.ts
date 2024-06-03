import { Request, Response } from "express";
import db from "../sql/configSql";

type Ad = {
  id: number;
  title: string;
  description: string;
  owner: string;
  price: number;
  picture: string;
  location: string;
  createdAt: Date;
  category: number;
};

const getAdsByCategory = async (req: Request, res: Response): Promise<any> => {
  try {
    const { category } = req.params;
    const query: string =
      "SELECT * FROM ad INNER JOIN category ON ad.categoryId = category.id WHERE category.name = ?";
    db.all(query, [category], (err, rows) => {

      if (err) {
        return res.status(500).send(err.message);
      }
      return res.status(200).send(rows);
    });
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

const getAdsByCategories = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const categories = req.params.categories.split(",");
    const categoriesToPrepare = categories.map(() => "?").join(",");

    const query = `SELECT * FROM ad INNER JOIN category ON ad.categoryId = category.id WHERE category.name IN (${categoriesToPrepare})`;

    db.all(query, categories, (err, rows) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      return res.status(200).send(rows);
    });
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

const getAveragePriceByCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { category } = req.params;
    const query =
      "SELECT ROUND(AVG(price), 0) as averagePrice FROM ad INNER JOIN category ON ad.categoryId = category.id WHERE category.name = ?";
    db.all(query, [category], (err, rows) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      return res.status(200).send(rows);
    });
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

const getAdsByCategoryByLetters = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { letters } = req.params;
    const query =
      "SELECT * FROM ad INNER JOIN category ON ad.categoryId = category.id WHERE category.name LIKE ?";
    db.all(query, [`${letters}%`], (err, rows) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      return res.status(200).send(rows);
    });
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

// Créer un endpoint qui permet d’ajouter une annonce et de créer sa catégorie à la volée, tout cela dans une transaction
const postAdWithCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { title, description, owner, price, picture, location, category }: Ad =
      req.body;

    // check the required fields
    if (
      !title ||
      !description ||
      !owner ||
      !price ||
      !picture ||
      !location ||
      !category
    ) {
      return res.status(400).send("Missing required fields");
    }

    // start the transaction
    db.run("BEGIN TRANSACTION");

    // check if the category already exists
    const categoryQuery = "SELECT * FROM category WHERE name = ?";

    // insert the category if it doesn't exist
    db.get(categoryQuery, [category], (err, row) => {
      if (err) {
        db.run("ROLLBACK");
        return res.status(500).send(err.message);
      }

      if (!row) {
        const insertCategoryQuery = "INSERT INTO category (name) VALUES (?)";

        db.run(insertCategoryQuery, [category], (err) => {
          if (err) {
            db.run("ROLLBACK");
            return res.status(500).send(err.message);
          }
        });
      }

      // get the category id
      const categoryIdQuery = "SELECT id FROM category WHERE name = ?";

      db.get(categoryIdQuery, [category], (err, row) => {
        const rowCategory = row as { id: number };

        if (err) {
          db.run("ROLLBACK");
          return res.status(500).send(err.message);
        }

        const categoryId = rowCategory.id;

        const createdAt = new Date();

        // insert the ad
        const insertAdQuery =
          "INSERT INTO ad (title, description, owner, price, picture, location, createdAt, categoryId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        db.run(
          insertAdQuery,
          [title, description, owner, price, picture, location, createdAt, categoryId],
          (err) => {
            if (err) {
              db.run("ROLLBACK");
              return res.status(500).send(err.message);
            } else {
              db.run("COMMIT");
              return res.status(201).send("Ad created successfully");
            }
          }
        );
      });
    });
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

export {
  getAdsByCategory,
  getAdsByCategories,
  getAveragePriceByCategory,
  getAdsByCategoryByLetters,
  postAdWithCategory,
};
