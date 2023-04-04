import express from "express";
import { home, playSong, searchSongList } from "../controllers/songController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/api/songs", searchSongList);
rootRouter.get("/song/:artist/:title", playSong);

export default rootRouter;
