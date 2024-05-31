import express from "express";
import {
  getAllAdsWithOrm,
  getAllAdsWithOrmFromBordeaux,
  deleteAdWithOrmIfPriceMoreThan40,
  updateAddWithOrmIfFirstOfSeptember,
  getAverageWithOrmPriceOfParisAds,
  postNewAdWithOrm,
  getAveragePriceOfAdsByLocationWithOrm,
  deleteAdWithOrmWithPriceInParameter,
} from "../controllers/ads-orm.controller";

const router = express.Router();

router.get("/", getAllAdsWithOrm);
router.get("/bordeaux", getAllAdsWithOrmFromBordeaux);
router.delete("/40", deleteAdWithOrmIfPriceMoreThan40);
router.put("/september", updateAddWithOrmIfFirstOfSeptember);
router.get("/avg-paris", getAverageWithOrmPriceOfParisAds);
router.post("/", postNewAdWithOrm);
router.get("/avg-location", getAveragePriceOfAdsByLocationWithOrm);
router.delete("/:price", deleteAdWithOrmWithPriceInParameter);

export default router;