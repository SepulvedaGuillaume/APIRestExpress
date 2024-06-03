import express from "express";
import {
  getAdsByCategoryOrm,
  getAdsByCategoriesOrm,
  getAveragePriceByCategoryOrm,
  getAdsByCategoryByLettersOrm,
  postAdWithCategoryOrm,
} from "../controllers/categories-orm.controller";

const router = express.Router();

router.get("/:category", getAdsByCategoryOrm);
router.get("/multiple/:categories", getAdsByCategoriesOrm);
router.get("/avg/:category", getAveragePriceByCategoryOrm);
router.get("/search/:letters", getAdsByCategoryByLettersOrm);
router.post("/", postAdWithCategoryOrm);

export default router;
