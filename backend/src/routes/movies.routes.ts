import express from "express";
import {
  getCountMovies,
  getTotalBudget,
  getMoviesWithMinYearOrRequestedTime,
  postMovie,
  updateMovie,
  deleteMovies,
} from "../controllers/movies.controller";

const router = express.Router();

router.get("/count", getCountMovies);
router.get("/totalBudget", getTotalBudget);
router.get("/", getMoviesWithMinYearOrRequestedTime);
router.post("/", postMovie);
router.put("/", updateMovie);
router.delete("/", deleteMovies);

export default router;
