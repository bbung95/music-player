import axios from "axios";
import { get } from "./utils/module.js";
import { async } from "regenerator-runtime";
import { setPlayListContainer } from "./playList";

const $navigation = get(".navigation");
const $homeBtn = get(".home-btn");
const $searchBoxBtn = get(".search-box-btn");
const $playListBtn = get(".player-btn");
const $loginBtn = get(".login-btn");
const $logoutBtn = get(".logout-btn");

const $searchContainer = get(".search-container");
const $trendingContainer = get(".trending-container");
const $playListContainer = get(".play-list-container");
const $playListSongContainer = get(".play-list-song-container");

const fetchLogout = async () => {
    const res = await axios.get("/api/logout");

    return res;
};

export const setNavigationModule = () => {
    $searchBoxBtn.onclick = () => {
        $searchContainer.classList.toggle("active");
        $navigation.classList.toggle("search");

        window.onclick = (e) => {
            console.log(e.target);
        };
    };
    $logoutBtn.onclick = () => {
        const res = fetchLogout();
        if (!res) return;
        alert("로그아웃 되었습니다.");
        location.href = "/";
    };

    $homeBtn.onclick = () => {
        $playListContainer.classList.add("hidden");
        $playListSongContainer.classList.add("hidden");
        $trendingContainer.classList.remove("hidden");
    };

    $playListBtn.onclick = () => {
        $playListContainer.classList.remove("hidden");
        $playListSongContainer.classList.add("hidden");
        $trendingContainer.classList.add("hidden");

        setPlayListContainer();
    };

    if (isLogin == "true") {
        $loginBtn.classList.toggle("hidden");
        $logoutBtn.classList.toggle("hidden");
    }
};
