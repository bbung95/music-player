import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    thumbnail: { type: String, required: true },
    listener: { type: Number, default: 0 },
    playcount: { type: Number, default: 0 },
    videoId: { type: String, required: true },
});

const Song = mongoose.model("Song", songSchema);

export default Song;
