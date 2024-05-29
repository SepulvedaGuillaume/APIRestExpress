import express from "express";
import adsRoutes from "./ads.routes";
import moviesRoutes from "./movies.routes";
import adsSqlRoutes from "./ads-sql.routes";

const router = express.Router();

router.use("/ads", adsRoutes);
router.use("/movies", moviesRoutes);
router.use("/ads-sql", adsSqlRoutes);

export default router;
