import mongoose from "mongoose";

const playSchema = new mongoose.Schema({
    title: { type: String, required: true },
    userId: { type: String, required: true },
});

const Play = mongoose.model("Play", playSchema);

export default Play;
