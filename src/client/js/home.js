import axios from "axios";
import { async } from "regenerator-runtime";
import { get } from "./utils/module.js";
import { openModal } from "./playListModal.js";

const $trendingListBox = get(".trending-list-box");
const $recentListBox = get(".recent-list-box");

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

const fetchRecentList = async () => {
    const recent = localStorage.getItem("recent-list") ?? "[]";

    const res = await axios({
        method: "get",
        url: "/api/songs/recent",
        params: {
            recent,
        },
    });

    return res.data.data;
};

const setRecentList = async () => {
    const data = await fetchRecentList();

    console.log(data);

    if (data.length > 0) {
        data.forEach((item) => {
            const el = document.createElement("li");
            el.className = "recent-list-item";
            el.onclick = () => setPlayerSong(item._id);
            el.innerHTML = `
                  <img class="recent-item-img" src="${item.thumbnail ?? "empty_song.png"}">
                  <div class="info">
                    <div class="title truncate">${item.title}</div>
                    <p class="artist truncate">${item.artist}</p>
                  </div>
                `;

            $recentListBox.append(el);
        });
    } else {
        const el = `<div class="empty-item">
                        <div>플레이 곡이 없습니다.</div>
                        <p>곡을 플레이해주세요.</p>
                    </div>`;
        $recentListBox.innerHTML = el;
    }
};

export const setHomeModule = async () => {
    setRecentList();
    setTrendingListBox();
};
