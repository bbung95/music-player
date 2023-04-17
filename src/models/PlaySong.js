import mongoose from "mongoose";

const playSongSchema = new mongoose.Schema({
    songId: { type: String, required: true },
    playId: { type: String, required: true },
    order: { type: Number, required: true, default: 0 },
});

const PlaySong = mongoose.model("PlaySong", playSchema);

export default PlaySong;
