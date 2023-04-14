import express from "express";
import { home } from "../controllers/homeController";
import { song, playSong, searchSongList, getSong, getTrendingList } from "../controllers/songController";
import { search } from "../controllers/searchController";
import { addUser, login, loginUser, signup } from "../controllers/userController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/login", login);
rootRouter.get("/signup", signup);

rootRouter.post("/api/login", loginUser);
rootRouter.post("/api/signup", addUser);
rootRouter.get("/api/songs", searchSongList);
rootRouter.post("/api/song", playSong);
rootRouter.get("/api/song/:id", getSong);
rootRouter.get("/api/songs/trending", getTrendingList);

export default rootRouter;
