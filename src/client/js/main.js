import "../scss/styles.scss";
import "./search";
// import "./footer";

// 페이지 새로고침
window.onpageshow = function (event) {
    if (event.persisted) {
        document.location.reload();
    }
};
