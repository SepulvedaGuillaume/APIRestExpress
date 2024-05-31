import express from "express";
import { getAllTags, getTagsByName, deleteTag } from "../controllers/tags-orm.controller";
const router = express.Router();

router.get("/", getAllTags);
router.get("/:name", getTagsByName);
router.delete("/:id", deleteTag);

export default router;
