import async from "regenerator-runtime";
import axios from "axios";

const API_END_POINT = "https://ws.audioscrobbler.com/2.0/";

export const search = async (req, res) => {
    return res.render("search", { pageTitle: "Search" });
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
