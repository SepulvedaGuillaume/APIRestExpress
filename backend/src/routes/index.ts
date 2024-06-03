import express from "express";
import adsRoutes from "./ads.routes";
import moviesRoutes from "./movies.routes";
import adsSqlRoutes from "./ads-sql.routes";
import categoriesRoutes from "./categories.routes";
import adsOrmRoutes from "./ads-orm.routes";
import categoriesOrmRoutes from "./categories-orm.routes";
import tagsOrmRoutes from "./tags-orm.routes";

const router = express.Router();

router.use("/ads", adsRoutes);
router.use("/movies", moviesRoutes);
router.use("/ads-sql", adsSqlRoutes);
router.use("/ads-orm", adsOrmRoutes);
router.use("/categories", categoriesRoutes);
router.use("/categories-orm", categoriesOrmRoutes);
router.use("/tags-orm", tagsOrmRoutes);

export default router;
