import axios from "axios";
import { async } from "regenerator-runtime";
import { get } from "./utils/module.js";

const $trendingListBox = get(".trending-list-box");

const fetchGetTrendingList = async () => {
    const res = await axios.get("/api/songs/trending");

    return res.data;
};

const setTrendingListBox = async () => {
    const data = await fetchGetTrendingList();

    data.forEach((item) => {
        const el = document.createElement("li");
        el.className = "trending-item";
        el.onclick = async () => await setPlayerSong(item._id);
        el.innerHTML = `
        <img src="${item.thumbnail}" />
        <div class="item-info">
            <div class="title">${item.title}</div>
            <div class="artist">${item.artist}</div>
        </div>
        <span class="play-count">${item.playcount}</span>
      `;

        $trendingListBox.append(el);
    });
};

export const setHomeModule = async () => {
    setTrendingListBox();
};
