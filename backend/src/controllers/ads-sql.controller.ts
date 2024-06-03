import { Request, Response } from "express";
import db from "../sql/configSql";

const getAllAdsWithSql = async (req: Request, res: Response): Promise<any> => {
  try {
    const query = "SELECT * FROM ad";
    db.all(query, (err, rows) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      return res.status(200).send(rows);
    });
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

const getAllAdsWithSqlFromBordeaux = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const query = "SELECT * FROM ad WHERE location = 'Bordeaux'";
    db.all(query, (err, rows) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      return res.status(200).send(rows);
    });
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

const deleteAdWithSqlIfPriceMoreThan40 = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const query = "DELETE FROM ad WHERE price > 40";

    db.run(query, (err) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      return res.status(200).send("Ads with price > 40 have been deleted");
    });
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

const updateAddWithSqlIfFirstOfSeptember = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const query =
      "UPDATE ad SET price = 0 WHERE strftime('%m', createdAt) = '09' AND strftime('%d', createdAt) = '01'";

    db.run(query, (err) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      return res
        .status(200)
        .send("Ads with created date is 1st of September have been updated");
    });
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

const getAverageWithSqlPriceOfParisAds = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const query =
      "SELECT ROUND(AVG(price), 0) AS Moyenne FROM ad WHERE location = 'Paris'";
    db.get(query, (err, row) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      return res.status(200).send(row);
    });
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

const postNewAdWithSql = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, description, owner, price, picture, location, categoryId } = req.body;

    const query =
      "INSERT INTO ad (title, description, owner, price, picture, location, createdAt, categoryId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const createdAt = new Date().toISOString();

    db.run(
      query,
      [title, description, owner, price, picture, location, createdAt, categoryId],
      (err) => {
        if (err) {
          return res.status(500).send(err.message);
        }
        return res.status(200).send("New ad has been added");
      }
    );
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

const getAveragePriceOfAdsByLocationWithSql = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const query =
      "SELECT location, ROUND(AVG(price), 0) AS Moyenne FROM ad GROUP BY location";
    db.all(query, (err, rows) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      return res.status(200).send(rows);
    });
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

const deleteAdWithSqlWithPriceInParameter = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { price } = req.params;
    const query = `DELETE FROM ad WHERE price > ${price}`;

    db.run(query, (err) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      return res.status(200).send(`Ads with price > ${price} have been deleted`);
    });
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

export {
  getAllAdsWithSql,
  getAllAdsWithSqlFromBordeaux,
  deleteAdWithSqlIfPriceMoreThan40,
  updateAddWithSqlIfFirstOfSeptember,
  getAverageWithSqlPriceOfParisAds,
  postNewAdWithSql,
  getAveragePriceOfAdsByLocationWithSql,
  deleteAdWithSqlWithPriceInParameter
};
