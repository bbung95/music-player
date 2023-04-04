import { async } from "regenerator-runtime";

const get = (target) => document.querySelector(target);

const $searchInput = get("input[name=track]");
const $searchBtn = get("#search-btn");
const $searchListBox = get(".search-list-box");

const showSearchBox = () => {
    $searchListBox.classList.remove("hidden");
};

const hideSearchBox = () => {
    $searchListBox.classList.add("hidden");
};

let listData = [];

const playSong = (title, artist) => {
    const findData = listData.find(({ track }) => title === track.name && artist === track.artist.name);

    console.log(findData);

    // location.href=`/song/${findData.}`
};

const setSearchItem = ({ data }) => {
    $searchListBox.innerHTML = "";

    if (data.length > 0) {
        data.forEach(({ track }) => {
            const el = document.createElement("li");
            el.className = "search-item";
            el.onclick = () => playSong(track.name, track.artist.name);
            el.innerHTML = `<img src="${track.album?.image[2]["#text"] || "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png"}" />
            <span class="title">${track.name}</span>
            <span class="artist">${track.artist.name}</span>`;

            $searchListBox.append(el);
        });

        showSearchBox();
    } else {
        hideSearchBox();
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

$searchBtn.onclick = handleSearch;
