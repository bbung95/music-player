import axios from "axios";
import { get } from "./utils/module";
import { async } from "regenerator-runtime";
import { setPlayListContainer } from "./playList";

const $playListContainer = get(".play-list-container");
const $playListSongContainer = get(".play-list-song-container");

const $playListImage = $playListSongContainer?.querySelector(".play-list-image");
const $playListTitle = $playListSongContainer?.querySelector(".info-box .title");
const $playListCount = $playListSongContainer?.querySelector(".info-box .count");
const $playListSongBox = $playListSongContainer?.querySelector(".play-list-song-box");
const $allPlayBtn = $playListSongContainer?.querySelector(".all-play-btn");
const $deleteBtn = $playListSongContainer?.querySelector(".delete-btn");
const $backBtn = $playListSongContainer?.querySelector(".back-btn");

let playListData = [];

const fetchGetPlayListSong = async (id) => {
    const res = await axios.get(`/api/playlist/${id}`);

    return res.data.data;
};

const fetchDeletePlay = async (id) => {
    const res = await axios.delete(`/api/playlist/${id}`);

    return res;
};

const fetchDeleteSong = async (id) => {
    const res = await axios.delete(`/api/playlist/song/${id}`);

    return res;
};

const handleDeleteSong = async (e, id) => {
    e.stopPropagation();

    const res = await fetchDeleteSong(id);

    playListData = playListData.filter((item) => item.playSongId != id);
    setPlayListSongs(playListData);
};

const setPlayListSongs = (data) => {
    $playListSongBox.innerHTML = "";

    if (data.length > 0) {
        data.forEach((item, idx) => {
            const el = document.createElement("li");
            el.className = "play-list-item";
            el.onclick = async (e) => await setPlayerSong(item._id);
            el.innerHTML = `
                <span class="rank">${idx + 1}</span>
                <img class="play-list-img" src="${item.thumbnail}" />
                <div class="title truncate">${item.title}</div>
                <div class="artist truncate">${item.artist}</div>`;

            const optionButton = document.createElement("button");
            optionButton.className = "option-btn";
            optionButton.type = "button";
            optionButton.onclick = (e) => handleDeleteSong(e, item.playSongId);
            optionButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
            </svg>`;
            el.append(optionButton);

            $playListSongBox.append(el);
        });
    } else {
        const el = `<div class="empty-item">
                        <div>음악을 추가해주세요.</div>
                    </div>`;
        $playListSongBox.innerHTML = el;
    }
};

const showPlayContainer = () => {
    $playListContainer.classList.toggle("hidden");
    $playListSongContainer.classList.toggle("hidden");
};

export const openPlayListSong = async (id) => {
    const data = await fetchGetPlayListSong(id);

    $playListImage.src = data.list[0]?.thumbnail ?? "empty_song.png";
    $playListTitle.textContent = data.play.title;
    $playListCount.textContent = data.list.length + "곡";

    playListData = data.list;
    setPlayListSongs(data.list);

    showPlayContainer();

    $backBtn.onclick = () => {
        showPlayContainer();
        setPlayListBox();
    };
    $allPlayBtn.onclick = () => {
        if (playListData.length > 0) playerSongs(playListData);
    };
    $deleteBtn.onclick = async () => {
        if (!confirm("재생목록을 삭제합니다.")) return;
        const res = await fetchDeletePlay(id);

        await setPlayListContainer();
        showPlayContainer();
    };
};
