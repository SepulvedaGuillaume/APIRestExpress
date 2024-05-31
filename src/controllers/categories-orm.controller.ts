import { Request, Response } from "express";
import Ad from "../sql/entities/Ad";
import Category from "../sql/entities/Category";
import { In } from "typeorm";
import dataSource from "../sql/dataSource";

const getAdsByCategoryOrm = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { category } = req.params;

    const ads = await Ad.find({
      relations: ["category"],
      where: {
        category: {
          name: category,
        },
      },
    });

    return res.status(200).send(ads);
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

const getAdsByCategoriesOrm = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { categories } = req.params;

    // split the categories
    const categoriesSplit = categories.split(",");

    const ads = await Ad.find({
      relations: ["category"],
      where: {
        category: {
          name: In(categoriesSplit),
        },
      },
    });

    return res.status(200).send(ads);
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

const getAveragePriceByCategoryOrm = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { category } = req.params;

    const avgPrice = await Ad.createQueryBuilder("ad")
      .select("ROUND(AVG(ad.price), 0)", "avgPrice")
      .innerJoin("ad.category", "category")
      .where("category.name = :category", { category })
      .getRawOne();

    return res.status(200).send(avgPrice);
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

const getAdsByCategoryByLettersOrm = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { letters } = req.params;

    // doit récupérer le nom des category
    const ads = await Ad.createQueryBuilder("ad")
      .select("ad", "category")
      .innerJoinAndSelect("ad.category", "category")
      .where("category.name LIKE :letters", { letters: `${letters}%` })
      .getMany();

    return res.status(200).send(ads);
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

// Créer un endpoint qui permet d’ajouter une annonce et de créer sa catégorie à la volée, tout cela dans une transaction
const postAdWithCategoryOrm = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { title, description, owner, price, picture, location, category } =
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

    // start the transaction with typeOrm
    await dataSource.transaction(async (transactionalEntityManager) => {
      // check if the category already exists
      let categoryFound = await Category.findOne({
        where: {
          name: category,
        },
      });

      // if the category doesn't exist, create it
      if (!categoryFound) {
        categoryFound = await transactionalEntityManager.save(
          Category,
          {
            id: Math.floor(Math.random() * 1000),
            name: category,
          }
        );
      }

      // insert the ad
      const ad = new Ad();
      ad.title = title;
      ad.description = description;
      ad.owner = owner;
      ad.price = price;
      ad.picture = picture;
      ad.location = location;
      ad.createdAt = new Date();
      ad.categoryId = categoryFound.id;

      await transactionalEntityManager.save(Ad, ad);

      return res.status(201).send("Ad created successfully");
    });
  } catch (error) {
    console.log(error);
    
    return res.status(500).send("An error occurred");
  }
};

export {
  getAdsByCategoryOrm,
  getAdsByCategoriesOrm,
  getAveragePriceByCategoryOrm,
  getAdsByCategoryByLettersOrm,
  postAdWithCategoryOrm,
};
