import ads from "../utils/data";
import { Request, Response } from "express";

const getAllAds = async (req: Request, res: Response): Promise<any> => {
  try {
    return res.set("Content-Type", "application/json").status(200).send(ads);
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

const postAd = async (req: Request, res: Response): Promise<any> => {
  try {    
    // check if the price and title are provided
    if (!req.body.price || !req.body.title) {
      return res.status(400).send("Price and title are required");
    }

    // check if the name already exists
    const ad = ads.find((ad) => ad.title === req.body.title);
    if (ad) {
      return res.status(400).send("Ad already exists");
    }

    // add new ad
    req.body = { id: ads.length + 1, ...req.body, createdAt: new Date() };
    ads.push(req.body);
    return res.status(201).send(req.body);
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

const deleteAd = async (req: Request, res: Response): Promise<any> => {
  try {
    const adId = parseInt(req.params.id);

    // vérifier si l'annonce existe
    const adIndex = ads.findIndex((ad) => ad.id === adId);
    if (adIndex === -1) {
      res.status(404).send("Annonce non trouvée");
    }

    // supprimer l'annonce
    ads.splice(adIndex, 1);

    return res.status(200).send(`The ad with id ${adId} has been deleted`);
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

const updateAd = async (req: Request, res: Response): Promise<any> => {
  try {
    const adId = parseInt(req.params.id);

    // vérifier si l'annonce existe
    const adIndex = ads.findIndex((ad) => ad.id === adId);

    if (adIndex === -1) {
      return res.status(404).send("Ad not found");
    }

    // update the ad
    ads[adIndex] = { ...ads[adIndex], ...req.body };

    return res.status(200).send(ads[adIndex]);
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

export { getAllAds, postAd, deleteAd, updateAd };
