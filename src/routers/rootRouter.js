import express from "express";
import { home, song, playSong, searchSongList } from "../controllers/songController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/song", song);
rootRouter.get("/api/songs", searchSongList);
rootRouter.get("/song/:artist/:title", playSong);

export default rootRouter;
