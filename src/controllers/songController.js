import async from "regenerator-runtime";
import Song from "../models/Song";
import User from "../models/User";
import axios from "axios";

const API_END_POINT = "https://ws.audioscrobbler.com/2.0/";

export const home = async (req, res) => {
    // const list = await Song.find({}).sort({ playcount: "desc" }).limit(10);

    // return res.render("home", { pageTitle: "Home", topList: list });
    return res.render("home", { pageTitle: "Home" });
};

export const song = async (req, res) => {
    return res.render("song", { pageTitle: "Song" });
};

export const playSong = async (req, res) => {
    const data = {
        title: req.params.title,
        artist: req.params.artist,
        thumbnail: req.query?.thumbnail,
    };

    const findSong = await Song.findOne({ title: data.title });

    // 등록
    if (!findSong) {
        const song = new Song(data);
        await song.save();
        await res.render("song", { pageTitle: "Song", data: song });
    } else {
        // 카운트 업
        await Song.update({ title: data.title }, { playcount: findSong.playcount + 1 });
        await res.render("song", { pageTitle: "Song", data: findSong });
    }
};

export const searchSongList = async (req, res) => {
    const searchKeyword = req.query.keyword;

    const resp = await axios.get(API_END_POINT, {
        params: {
            method: "track.search",
            track: encodeURIComponent(searchKeyword),
            api_key: process.env.LAST_FM_KEY,
            limit: 10,
            format: "json",
        },
    });
    const list = resp.data.results?.trackmatches?.track || [];

    let newTracks = [];
    for (let data of list) {
        newTracks.push(await fomatSong(data));
    }

    return res.json(newTracks);
};

const fomatSong = async (data) => {
    const resp = await axios.get(API_END_POINT, {
        params: {
            method: "track.getInfo",
            track: data.name,
            artist: data.artist,
            api_key: process.env.LAST_FM_KEY,
            format: "json",
        },
    });
    return resp.data;
};
