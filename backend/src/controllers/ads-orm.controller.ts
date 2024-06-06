import { Request, Response } from "express";
import Ad from "../sql/entities/Ad";
import { MoreThan, In } from "typeorm";
import Tag from "../sql/entities/Tag";
import Category from "../sql/entities/Category";

const getAllAdsWithOrm = async (req: Request, res: Response): Promise<any> => {
  try {
    // find the category name for each ad and the tags for each ad
    const ads = await Ad.find({
      relations: ["category", "tags"],
    });

    return res.status(200).send(ads);
  } catch (error) {
    console.log(error);
    return res.status(500).send("An error occurred");
  }
};

const getAdWithOrm = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send("Missing required fields");
    }

    const ad = await Ad.findOne({
      relations: ["category", "tags"],
      where: { id: parseInt(id) },
    });

    if (!ad) {
      return res.status(404).send("Ad not found");
    }

    return res.status(200).send(ad);
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
    const {
      title,
      description,
      owner,
      price,
      picture,
      location,
      category,
      tags,
    } = req.body;

    // Check and log each required field
    if (!title) {
      console.log("Missing title");
      return res.status(400).send("Missing title");
    }
    if (!owner) {
      console.log("Missing owner");
      return res.status(400).send("Missing owner");
    }
    if (price === undefined) {
      // explicitly check for undefined
      console.log("Missing price");
      return res.status(400).send("Missing price");
    }
    if (!location) {
      console.log("Missing location");
      return res.status(400).send("Missing location");
    }
    if (!category) {
      console.log("Missing category");
      return res.status(400).send("Missing category");
    }

    // find the categoryId from the category name
    const categoryId = await Category.findOne({ where: { name: category } });

    const ad = new Ad();
    ad.id = Math.floor(Math.random() * 1000);
    ad.title = title;
    ad.description = description;
    ad.owner = owner;
    ad.price = price;
    ad.picture = picture;
    ad.location = location;
    ad.createdAt = new Date();
    ad.category = categoryId;
    ad.tags = [];

    await ad.save();

    if (tags && tags.length > 0) {
      for (const tagName of tags) {
        // Vérifiez si le tag existe déjà
        let tag = await Tag.findOne({ where: { name: tagName } });

        // Si le tag n'existe pas, créez-le
        if (!tag) {
          tag = new Tag();
          tag.name = tagName;
          await tag.save();
        }

        // Ajoutez le tag à l'annonce
        ad.tags.push(tag);
      }

      // Enregistrez l'annonce mise à jour avec les tags
      await ad.save();
    }

    return res.status(201).send(ad);
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

const updateAd = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { title, description, price, picture, location, categoryId, tags } =
      req.body;

    if (!title || !price || !location || !categoryId) {
      return res.status(400).send("Missing required fields");
    }

    const ad = await Ad.findOne({ where: { id: parseInt(id) } });

    if (!ad) {
      return res.status(404).send("Ad not found");
    }

    ad.title = title;
    ad.description = description;
    ad.price = price;
    ad.picture = picture;
    ad.location = location;
    ad.categoryId = categoryId;

    await ad.save();

    if (tags && tags.length > 0) {
      ad.tags = [];

      for (const tagName of tags) {
        // Vérifiez si le tag existe déjà
        let tag = await Tag.findOne({ where: { name: tagName } });

        // Si le tag n'existe pas, créez-le
        if (!tag) {
          tag = new Tag();
          tag.name = tagName;
          await tag.save();
        }

        // Ajoutez le tag à l'annonce
        ad.tags.push(tag);
      }

      // Enregistrez l'annonce mise à jour avec les tags
      await ad.save();
    }

    return res.status(200).send(ad);
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

const getAdsByTags = async (req: Request, res: Response): Promise<any> => {
  try {
    const { tags } = req.params;

    const tagsSplit = tags.split(",");

    if (!tags || tags.length === 0) {
      return res.status(400).send("Missing required fields");
    }

    const ads = await Ad.find({
      relations: ["tags"],
      where: {
        tags: {
          name: In(tagsSplit),
        },
      },
    });

    return res.status(200).send(ads);
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

export {
  getAllAdsWithOrm,
  getAdWithOrm,
  getAllAdsWithOrmFromBordeaux,
  deleteAdWithOrmIfPriceMoreThan40,
  updateAddWithOrmIfFirstOfSeptember,
  getAverageWithOrmPriceOfParisAds,
  postNewAdWithOrm,
  getAveragePriceOfAdsByLocationWithOrm,
  deleteAdWithOrmWithPriceInParameter,
  updateAd,
  getAdsByTags,
};
