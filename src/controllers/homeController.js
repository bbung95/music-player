import async from "regenerator-runtime";
import Song from "../models/Song";
import axios from "axios";

export const home = async (req, res) => {
    return res.render("home", { pageTitle: "Home" });
};
