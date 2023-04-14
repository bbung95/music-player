import { get } from "./utils/module.js";

const $navigationTabs = get(".nav-tabs");
const $playerContainer = get(".player-container");
const $searchContainer = get(".search-container");
const $searchBoxBtn = get(".search-box-btn");
const $playerBtn = get(".player-btn");

export const setNavigationModule = () => {
    $playerBtn.onclick = () => {
        $playerContainer.classList.toggle("active");
        document.querySelector(".navigation").classList.toggle("disable");
        document.querySelector(".main").classList.toggle("disable");
    };
    $searchBoxBtn.onclick = () => {
        $searchContainer.classList.toggle("active");
        $navigationTabs.classList.toggle("search");
    };
};
