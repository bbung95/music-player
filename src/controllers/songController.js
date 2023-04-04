import async from "regenerator-runtime";
import Song from "../models/Song";
import User from "../models/User";
import request from "request";

export const home = async (req, res) => {
    return res.render("home", { pageTitle: "Home" });
};

export const playSong = async (req, res) => {
    const findSong = await Song.findOne({ title: "ditto" });

    // 등록
    if (!findSong) {
        const song = new Song(req.body);
        await song.save();
        await res.render("song", { pageTitle: "Song", data: song });
    } else {
        // 카운트 업
        await Song.findOneAndUpdate({ title: "ditto", update: req.body });
        await res.render("song", { pageTitle: "Song", data: findSong });
    }
};

export const searchSongList = async (req, res) => {
    const searchKeyword = req.query.keyword;

    request.get(`https://ws.audioscrobbler.com/2.0/?method=track.search&track=${searchKeyword}&api_key=${process.env.LAST_FM_KEY}&format=json`, async (error, response, body) => {
        if (error) {
            console.log(error);
        }

        let list = JSON.parse(body).results?.trackmatches?.track || [];
        let newTracks = [];
        for (let data of list) {
            newTracks.push(
                JSON.parse(await doRequest(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${process.env.LAST_FM_KEY}&artist=${data.artist}&track=${data.name}&format=json`))
            );
        }

        return res.json(newTracks);
    });
};

function doRequest(url) {
    return new Promise(function (resolve, reject) {
        request(url, function (error, res, body) {
            if (!error && res.statusCode === 200) {
                resolve(body);
            } else {
                reject(error);
            }
        });
    });
}
