import express from "express";
import adsRoutes from "./ads.routes";
import moviesRoutes from "./movies.routes";
import adsSqlRoutes from "./ads-sql.routes";
import categoriesRoutes from "./categories.routes";

const router = express.Router();

router.use("/ads", adsRoutes);
router.use("/movies", moviesRoutes);
router.use("/ads-sql", adsSqlRoutes);
router.use("/categories", categoriesRoutes);

export default router;
