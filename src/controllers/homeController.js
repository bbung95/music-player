import async from "regenerator-runtime";
import Song from "../models/Song";
import axios from "axios";

export const home = async (req, res) => {
    const list = await Song.find({}).sort({ playcount: "desc" }).limit(6);

    return res.render("home", { pageTitle: "Home", trendingList: list });
};
