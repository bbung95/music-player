import { get } from "./utils/module.js";

const $navigation = get(".navigation");
const $searchContainer = get(".search-container");
const $searchBoxBtn = get(".search-box-btn");
const $playerBtn = get(".player-btn");

export const setNavigationModule = () => {
    $searchBoxBtn.onclick = () => {
        $searchContainer.classList.toggle("active");
        $navigation.classList.toggle("search");
    };
};
