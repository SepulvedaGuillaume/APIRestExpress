import express from "express";
import {
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
} from "../controllers/ads-orm.controller";

const router = express.Router();

router.get("/", getAllAdsWithOrm);
router.get("/:id", getAdWithOrm);
router.get("/bordeaux", getAllAdsWithOrmFromBordeaux);
router.delete("/40", deleteAdWithOrmIfPriceMoreThan40);
router.put("/september", updateAddWithOrmIfFirstOfSeptember);
router.get("/avg-paris", getAverageWithOrmPriceOfParisAds);
router.post("/", postNewAdWithOrm);
router.get("/avg-location", getAveragePriceOfAdsByLocationWithOrm);
router.delete("/:price", deleteAdWithOrmWithPriceInParameter);
router.put("/:id", updateAd);
router.get("/tags/:tags", getAdsByTags);

export default router;
