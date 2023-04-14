import { async } from "regenerator-runtime";
import { get } from "./utils/module.js";
import axios from "axios";

const $navigation = get(".navigation");
const $searchContainer = get(".search-container");
const $searchListBox = get(".search-list-box");
const $searchInput = get("input[name=search-keyword]");
const $searchBtn = get(".search-btn");
const $backBtn = get(".back-btn");

let listData = [];

const playSong = async (title, artist) => {
    const findData = listData.find(({ track }) => title === track.name && artist === track.artist.name);

    const res = await axios({
        method: "post",
        url: "/api/song",
        data: {
            title: findData.track.name,
            artist: findData.track.artist.name,
            thumbnail: findData.track.album?.image[2]["#text"] ?? "empty_song.png",
        },
        headers: {
            "Content-Type": "application/json",
        },
    });

    setPlayerSong(res.data.data._id);
};

const setSearchItem = ({ data }) => {
    $searchListBox.innerHTML = "";

    data.forEach(({ track }) => {
        if (!track) return;

        const el = document.createElement("li");
        el.className = "search-item";
        el.onclick = () => playSong(track.name, track.artist.name);
        el.innerHTML = `<img src="${track.album?.image[2]["#text"] || "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png"}" />
            <div class="item-info">
                <div class="title">${track.name}</div>
                <div class="artist">${track.artist.name}</div>
            </div>`;

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
        setSearchItem(res);
        listData = res.data;
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
