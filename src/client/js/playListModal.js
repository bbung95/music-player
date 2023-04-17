import { get } from "./utils/module";
import { fetchGetPlayList } from "./playList.js";
import { async } from "regenerator-runtime";
import axios from "axios";

const $playListModal = get("#play-list-modal");
const $modalPlayListBox = $playListModal.querySelector(".list-box");
const $playListModalCancel = $playListModal.querySelector(".cancel-btn");

const fetchAddPlayListSong = async (id, songId) => {
    const res = await axios({
        url: `/api/playlist/${id}`,
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            songId,
        },
    });

    return res;
};

const addPlayListSong = async (id, songId) => {
    const res = await fetchAddPlayListSong(id, songId);

    alert("재생목록에 추가되었습니다.");

    $playListModal.close();
};

const setPlayList = async (songId) => {
    const data = await fetchGetPlayList();

    $modalPlayListBox.innerHTML = "";

    data.forEach((item) => {
        const el = document.createElement("li");
        el.className = "list-item";
        el.onclick = () => addPlayListSong(item._id, songId);
        el.innerHTML = `<div class="title truncate">${item.title}</div>`;

        $modalPlayListBox.append(el);
    });
};

export const openModal = async (songId) => {
    setPlayList(songId);
    $playListModal.showModal();
};

$playListModal.onclick = (event) => {
    if (event.target.nodeName === "DIALOG") {
        $playListModal.close();
    }
};

$playListModalCancel.onclick = () => $playListModal.close();
