import express from "express";
import {searchArtists, getArtistById, getRelatedArtists} from "../controllers/artistController.js";

const router = express.Router();

router.get("/search", searchArtists);
router.get("/:id/related", getRelatedArtists);
router.get("/:id", getArtistById);


export default router;