import axios from "axios";
import { get } from "./utils/module";
import { async } from "regenerator-runtime";

const $playListTitle = get(".play-list-container .title");
const $playListBox = get(".play-list-box");

const $playListAddModalBtn = get(".play-list-container .add-modal-btn");
const $playListModal = get("#play-list-modal");
const $modalAddBtn = get(".add-btn");
const $modalCancelBtn = get(".cancel-btn");
const $playListTitleInput = get("input[name=title]");

const fetchGetAuthPlayList = async () => {
    const res = await axios.get("/api/playlist");

    return res.data.data;
};

const setPlayListBox = async () => {
    const data = await fetchGetAuthPlayList();

    if (data.length > 0) {
        $playListBox.innerHTML = "";

        data.forEach((item) => {
            const el = document.createElement("li");
            el.className = "play-list-item";
            el.innerHTML = `
                  <img class="play-list-img" src="https://via.placeholder.com/180X180">
                  <div class="info">
                    <div class="title">${item.title}</div>
                    <p class="count">3곡</p>
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

const setPlayListContainer = () => {
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

const addPlayList = () => {
    const title = $playListTitleInput.value;
    if (!title) {
        alert("타이틀을 입력해주세요.");
        return;
    }

    const res = fetchAddPlayList(title);

    if (!res) return;

    $playListTitleInput.value = "";
    setPlayListBox();
    $playListModal.close();
};

export const setPlayListModule = () => {
    setPlayListContainer();

    $playListAddModalBtn.onclick = () => {
        $playListModal.showModal();
    };

    $modalAddBtn.onclick = addPlayList;

    $modalCancelBtn.onclick = () => {
        $playListModal.close();
    };

    if (isLogin == "false") {
        $playListAddModalBtn.remove();
    }

    $playListModal.onclick = (event) => {
        if (event.target.nodeName === "DIALOG") {
            $playListModal.close();
        }
    };
};
