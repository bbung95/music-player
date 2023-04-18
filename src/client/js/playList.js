import axios from "axios";
import { get } from "./utils/module";
import { async } from "regenerator-runtime";
import { openPlayListSong } from "./playListSong";

const $playListTitle = get(".play-list-container .title");
const $playListBox = get(".play-list-box");

const $playListAddModalBtn = get(".play-list-container .add-modal-btn");
const $playListAddModal = get("#play-list-add-modal");
const $modalAddBtn = $playListAddModal?.querySelector(".add-btn");
const $modalCancelBtn = $playListAddModal?.querySelector(".cancel-btn");
const $playListTitleInput = $playListAddModal?.querySelector("input[name=title]");

export const fetchGetPlayList = async () => {
    const res = await axios.get("/api/playlist");

    return res.data.data;
};

const setPlayListBox = async () => {
    const data = await fetchGetPlayList();

    if (data.length > 0) {
        $playListBox.innerHTML = "";

        data.forEach((item) => {
            const el = document.createElement("li");
            el.className = "play-list-item";
            el.onclick = () => openPlayListSong(item._id);
            el.innerHTML = `
                  <img class="play-list-img" src="${item.thumbnail ?? "empty_song.png"}">
                  <div class="info">
                    <div class="title truncate">${item.title}</div>
                    <p class="count">${item.count}곡</p>
                  </div>
                `;

            $playListBox.append(el);
        });
    } else {
        const el = `<div class="empty-item">
                          <div>플레이리스트 없음</div>
                          <p>플레이리스트를 만들어주세요.</p>
                      </div>`;
        $playListBox.innerHTML = el;
    }
};

export const setPlayListContainer = () => {
    if (isLogin == "true") {
        $playListTitle.textContent = `${sessionUser.nickname}님의 Play List`;
        setPlayListBox();
    }
};

const fetchAddPlayList = (title) => {
    const res = axios({
        url: "/api/playlist",
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            title,
        },
    });

    return res;
};

const addPlayList = async () => {
    const title = $playListTitleInput.value;
    if (!title) {
        alert("타이틀을 입력해주세요.");
        return;
    }

    const res = await fetchAddPlayList(title);

    if (!res) return;

    $playListTitleInput.value = "";
    setPlayListBox();
    $playListAddModal.close();
};

export const setPlayListModule = () => {
    setPlayListContainer();

    $playListAddModalBtn.onclick = () => {
        $playListAddModal.showModal();
    };
    $modalAddBtn.onclick = addPlayList;
    $modalCancelBtn.onclick = () => {
        $playListAddModal.close();
    };
    if (isLogin == "false") {
        $playListAddModalBtn.remove();
    }
    $playListAddModal.onclick = (event) => {
        if (event.target.nodeName === "DIALOG") {
            $playListAddModal.close();
        }
    };
};
