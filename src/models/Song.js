import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    thumbnail: { type: String, required: true },
    listener: { type: Number, default: 1 },
    playcount: { type: Number, default: 1 },
});

const Song = mongoose.model("Song", songSchema);

export default Song;
