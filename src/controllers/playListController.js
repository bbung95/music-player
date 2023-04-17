import async from "regenerator-runtime";
import Song from "../models/Song";
import Play from "../models/Play";
import PlaySong from "../models/PlaySong";
import axios from "axios";

export const getPlayList = async (req, res) => {
    const session = res.locals;

    if (!session.loggedIn) {
        return res.json({ data: [] });
    }

    const list = await Play.find({ userId: session.loggedInUser._id });

    const newList = [];
    for (let value of list) {
        const playSongs = await PlaySong.find({ playId: value._id });

        let thumbnail;
        if (playSongs.length > 0) {
            const song = await Song.findById(playSongs[0].songId);
            thumbnail = song.thumbnail;
        }

        newList.push({ ...value._doc, count: playSongs.length, thumbnail });
    }

    return res.json({ data: newList });
};

export const getPlayListSong = async (req, res) => {
    const id = req.params.id;

    const play = await Play.findById(id);
    const list = await PlaySong.find({ playId: id });

    const newList = [];
    for (let value of list) {
        const song = await Song.findById(value.songId);
        newList.push({ ...song._doc, playSongId: value._id });
    }

    return res.json({ data: { play, list: newList } });
};

export const removePlayList = async (req, res) => {
    const id = req.params.id;

    await PlaySong.deleteMany({ playId: id });
    await Play.remove({ _id: id });

    return res.json();
};

export const removePlayListSong = async (req, res) => {
    const id = req.params.id;

    await PlaySong.deleteOne({ _id: id });

    return res.json();
};

export const addPlayList = async (req, res) => {
    const session = res.locals;
    const body = req.body;

    const play = new Play({ ...body, userId: session.loggedInUser._id });
    await play.save();

    return res.json();
};

export const addPlayListSong = async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    const playSong = new PlaySong({ ...body, playId: id });
    await playSong.save();

    return res.json();
};
