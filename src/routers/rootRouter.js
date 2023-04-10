import express from "express";
import { home } from "../controllers/homeController";
import { song, playSong, searchSongList, getSong } from "../controllers/songController";
import { search } from "../controllers/searchController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/song", song);
rootRouter.get("/search", search);
rootRouter.get("/api/songs", searchSongList);
rootRouter.get("/api/song/:id", getSong);
rootRouter.get("/song/:artist/:title", playSong);

export default rootRouter;
