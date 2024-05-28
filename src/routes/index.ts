import express from "express";
import adsRoutes from "./ads.routes";
import moviesRoutes from "./movies.routes";

const router = express.Router();

router.use("/ads", adsRoutes);
router.use("/movies", moviesRoutes);

export default router;

