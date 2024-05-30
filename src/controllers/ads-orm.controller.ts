import { Request, Response } from "express";
import Ad from "../sql/entities/Ad";
import { MoreThan } from "typeorm";

const getAllAdsWithOrm = async (req: Request, res: Response): Promise<any> => {
  try {
    const ads = await Ad.find();
    return res.status(200).send(ads);
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

const getAllAdsWithOrmFromBordeaux = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const ads = await Ad.findBy({ location: "Bordeaux" });
    return res.status(200).send(ads);
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

const deleteAdWithOrmIfPriceMoreThan40 = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const ads = await Ad.delete({
      price: MoreThan(40),
    });

    return res
      .status(200)
      .send(`Ads with price > 40 have been deleted : ${ads.affected}`);
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

const updateAddWithOrmIfFirstOfSeptember = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const ads = await Ad.find();

    // Filtrer les annonces créées le 1er septembre
    const adsOnSeptember1 = ads.filter((ad) => {
      const creationDate = new Date(ad.createdAt);
      return creationDate.getMonth() === 8 && creationDate.getDate() === 1; // Mois est indexé à partir de 0
    });

    // update the ads with new price equal to 0
    adsOnSeptember1.forEach(async (ad) => {
      ad.price = 0;
      await ad.save();
    });

    return res
      .status(200)
      .send(`Ads with creation date = 09-01 have been updated`);
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

const getAverageWithOrmPriceOfParisAds = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    // using query builder
    const averagePrice = await Ad.createQueryBuilder()
      .select("ROUND(AVG(price), 0)", "averagePrice")
      .where("location = :location", { location: "Paris" })
      .getRawOne();

    return res.status(200).send(averagePrice);
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

const postNewAdWithOrm = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, description, owner, price, picture, location, categoryId } =
      req.body;

    if (!title || !owner || !price || !location || !categoryId) {
      return res.status(400).send("Missing required fields");
    }

    const ad = new Ad();
    ad.id = Math.floor(Math.random() * 1000);
    ad.title = title;
    ad.description = description;
    ad.owner = owner;
    ad.price = price;
    ad.picture = picture;
    ad.location = location;
    ad.createdAt = new Date();
    ad.categoryId = categoryId;

    const success = await ad.save();

    if (success) {
      return res.status(201).send(ad);
    }
  } catch (error) {
    console.log(error);

    return res.status(500).send("An error occurred");
  }
};

const getAveragePriceOfAdsByLocationWithOrm = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    // using query builder
    const averagePrices = await Ad.createQueryBuilder()
      .select("location")
      .addSelect("ROUND(AVG(price), 0)", "averagePrice")
      .groupBy("location")
      .getRawMany();

    return res.status(200).send(averagePrices);
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

const deleteAdWithOrmWithPriceInParameter = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { price } = req.params;

    if (!price) {
      return res.status(400).send("Missing required fields");
    }

    const ads = await Ad.delete({
      price: MoreThan(parseInt(price)),
    });

    return res
      .status(200)
      .send(`Ads with price = ${price} have been deleted : ${ads.affected}`);
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

export {
  getAllAdsWithOrm,
  getAllAdsWithOrmFromBordeaux,
  deleteAdWithOrmIfPriceMoreThan40,
  updateAddWithOrmIfFirstOfSeptember,
  getAverageWithOrmPriceOfParisAds,
  postNewAdWithOrm,
  getAveragePriceOfAdsByLocationWithOrm,
  deleteAdWithOrmWithPriceInParameter,
};
