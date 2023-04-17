import async from "regenerator-runtime";
import Song from "../models/Song";
import User from "../models/User";
import axios from "axios";

const API_END_POINT = "https://ws.audioscrobbler.com/2.0/";

export const playSong = async (req, res) => {
    let body = req.body;

    const findSong = await Song.findOne({ title: body.title, artist: body.artist });
    // 등록
    if (!findSong) {
        const videoId = await getYoutubeId(body.title, body.artist);
        body = { ...body, videoId: videoId };
        const song = new Song(body);
        await song.save();
        await res.json({ data: song });
    } else {
        // 카운트 업
        await res.json({ data: findSong });
    }
};

export const getSong = async (req, res) => {
    const id = req.params.id;
    const findSong = await Song.findById(id);
    await res.json({ data: findSong });
};

export const updatePlayCount = async (req, res) => {
    const id = req.params.id;
    const findSong = await Song.findById(id);
    Song.updateOne({ _id: id }, { playcount: findSong.playcount + 1 });

    res.json();
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

    return res.json({ data: newTracks });
};

export const getTrendingList = async (req, res) => {
    const list = await Song.find({}).sort({ playcount: "desc" }).limit(10);

    return res.json({ data: list });
};

const getYoutubeId = async (album, artist) => {
    const keyword = album + "+" + artist;
    const url = `https://www.googleapis.com/youtube/v3/search?part=id&q=${keyword}&type=video&maxResults=1&key=${process.env.YOUTUBE_API_KEY}`;
    const res = await axios.get(url);

    return res.data.items[0].id.videoId;
};

const fomatSong = async (data) => {
    const res = await axios.get(API_END_POINT, {
        params: {
            method: "track.getInfo",
            track: data.name,
            artist: data.artist,
            api_key: process.env.LAST_FM_KEY,
            format: "json",
        },
    });
    return res.data;
};
