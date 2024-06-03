import express from "express";
import { getAdsByCategory, getAdsByCategories, getAveragePriceByCategory, getAdsByCategoryByLetters, postAdWithCategory } from "../controllers/categories.controller";

const router = express.Router();

router.get("/:category", getAdsByCategory);
router.get("/multiple/:categories", getAdsByCategories);
router.get("/avg/:category", getAveragePriceByCategory);
router.get("/search/:letters", getAdsByCategoryByLetters);
router.post("/", postAdWithCategory);

export default router;
