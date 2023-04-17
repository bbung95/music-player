import async from "regenerator-runtime";
import Song from "../models/Song";
import Play from "../models/Play";
import axios from "axios";

export const getPlayList = async (req, res) => {
    const session = res.locals;

    if (!session.loggedIn) {
        return res.json({ data: [] });
    }

    const list = await Play.find({ userId: session.loggedInUser._id });

    return res.json({ data: list });
};

export const addPlayList = async (req, res) => {
    const session = res.locals;
    const body = req.body;

    const play = new Play({ ...body, userId: session.loggedInUser._id });
    await play.save();

    return res.json();
};

export const addPlayListSong = async (req, res) => {
    const body = req.body;

    return res.json();
};
