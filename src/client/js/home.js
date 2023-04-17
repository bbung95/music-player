import axios from "axios";
import { async } from "regenerator-runtime";
import { get } from "./utils/module.js";
import { openModal } from "./playListModal.js";

const $trendingListBox = get(".trending-list-box");

const handleOnClickOptionBtn = (e, id) => {
    e.stopPropagation();

    openModal(id);
};

const fetchGetTrendingList = async () => {
    const res = await axios.get("/api/songs/trending");

    return res.data.data;
};

const setTrendingListBox = async () => {
    const data = await fetchGetTrendingList();

    data.forEach((item, idx) => {
        const el = document.createElement("li");
        el.className = "trending-item";
        el.onclick = async (e) => await setPlayerSong(item._id);
        el.innerHTML = `
        <span class="rank">${idx + 1}</span>
        <img src="${item.thumbnail}" />
        <div class="item-info">
            <div class="title truncate">${item.title}</div>
            <div class="artist truncate">${item.artist}</div>
        </div>`;

        const optionButton = document.createElement("button");
        optionButton.className = "option-btn";
        optionButton.type = "button";
        optionButton.onclick = (e) => handleOnClickOptionBtn(e, item._id);
        optionButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
            </svg>`;
        el.append(optionButton);

        $trendingListBox.append(el);
    });
};

export const setHomeModule = async () => {
    setTrendingListBox();
};
