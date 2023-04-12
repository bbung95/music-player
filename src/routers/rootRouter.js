import express from "express";
import { home } from "../controllers/homeController";
import { song, playSong, searchSongList, getSong } from "../controllers/songController";
import { search } from "../controllers/searchController";
import { addUser, login, loginUser, signup } from "../controllers/userController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/login", login);
rootRouter.get("/signup", signup);
rootRouter.get("/song", song);
rootRouter.get("/search", search);
rootRouter.get("/song/:artist/:title", playSong);

rootRouter.post("/api/login", loginUser);
rootRouter.post("/api/signup", addUser);
rootRouter.get("/api/songs", searchSongList);
rootRouter.get("/api/song/:id", getSong);

export default rootRouter;
