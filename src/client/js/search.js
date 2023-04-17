import { async } from "regenerator-runtime";
import { get } from "./utils/module.js";
import axios from "axios";
import { openModal } from "./playListModal.js";

const $navigation = get(".navigation");
const $searchContainer = get(".search-container");
const $searchListBox = get(".search-list-box");
const $searchInput = get("input[name=search-keyword]");
const $searchBtn = get(".search-btn");
const $backBtn = get(".back-btn");

let listData = [];

const fetchAddSong = async (title, artist) => {
    const findData = listData.find(({ track }) => title === track.name && artist === track.artist.name);

    const res = await axios({
        method: "post",
        url: "/api/song",
        data: {
            title: findData.track.name,
            artist: findData.track.artist.name,
            thumbnail: findData.track.album?.image[3]["#text"] ?? "empty_song.png",
        },
        headers: {
            "Content-Type": "application/json",
        },
    });

    return res;
};

const playSong = async (title, artist) => {
    const res = await fetchAddSong(title, artist);

    setPlayerSong(res.data.data._id);
};

const handleOnClickOptionBtn = async (e, title, artist) => {
    e.stopPropagation();

    const res = await fetchAddSong(title, artist);

    openModal(res.data.data._id);
};

const setSearchItem = ({ data }) => {
    $searchListBox.innerHTML = "";

    data.forEach(({ track }) => {
        if (!track) return;

        const el = document.createElement("li");
        el.className = "search-item";
        el.onclick = () => playSong(track.name, track.artist.name);
        el.innerHTML = `<img src="${track.album?.image[3]["#text"] || "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png"}" />
            <div class="item-info">
                <div class="title truncate">${track.name}</div>
                <div class="artist truncate">${track.artist.name}</div>
            </div>`;

        const optionButton = document.createElement("button");
        optionButton.className = "option-btn";
        optionButton.type = "button";
        optionButton.onclick = (e) => handleOnClickOptionBtn(e, track.name, track.artist.name);

        optionButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
            </svg>`;
        el.append(optionButton);

        $searchListBox.append(el);
    });

    if (data.length === 0) {
        const el = document.createElement("div");
        el.className = "empty-item";
        el.innerHTML = `<div>결과 없음</div>
                        <p>새로운 검색을 시도하십시오.</p>`;

        $searchListBox.append(el);
    }
};

const fetchTrackInfo = async (value) => {
    const res = await axios.get("/api/songs", {
        params: {
            keyword: value,
        },
    });

    if (res.status === 200) {
        setSearchItem(res.data);
        listData = res.data.data;
    }
};

const handleSearch = () => {
    fetchTrackInfo($searchInput.value);
};

export const setSearchModule = () => {
    $searchBtn.onclick = handleSearch;
    $backBtn.onclick = () => {
        $searchContainer.classList.toggle("active");
        $navigation.classList.toggle("search");
    };
};
