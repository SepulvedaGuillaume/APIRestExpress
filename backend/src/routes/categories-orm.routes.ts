import express from "express";
import {
  getCategoriesOrm,
  getCategoryOrm,
  getAdsByCategoryOrm,
  getAdsByCategoriesOrm,
  getAveragePriceByCategoryOrm,
  getAdsByCategoryByLettersOrm,
  postAdWithCategoryOrm,
} from "../controllers/categories-orm.controller";

const router = express.Router();

router.get("/", getCategoriesOrm);
router.get("/:id", getCategoryOrm);
router.get("/ads/:id", getAdsByCategoryOrm);
router.get("/multiple/:categories", getAdsByCategoriesOrm);
router.get("/avg/:category", getAveragePriceByCategoryOrm);
router.get("/search/:letters", getAdsByCategoryByLettersOrm);
router.post("/", postAdWithCategoryOrm);

export default router;
