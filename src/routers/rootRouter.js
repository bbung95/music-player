import express from "express";
import { home } from "../controllers/homeController";
import { song, playSong, searchSongList, getSong, getTrendingList, updatePlayCount } from "../controllers/songController";
import { addUser, login, loginUser, logoutUser, signup } from "../controllers/userController";
import { addPlayList, getPlayList } from "../controllers/playListController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/login", login);
rootRouter.get("/signup", signup);

rootRouter.post("/api/login", loginUser);
rootRouter.get("/api/logout", logoutUser);
rootRouter.post("/api/signup", addUser);
rootRouter.get("/api/songs", searchSongList);
rootRouter.post("/api/song", playSong);
rootRouter.get("/api/song/:id", getSong);
rootRouter.put("/api/song/:id", updatePlayCount);
rootRouter.get("/api/songs/trending", getTrendingList);
rootRouter.get("/api/playlist", getPlayList);
rootRouter.post("/api/playlist", addPlayList);

export default rootRouter;
