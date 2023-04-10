import "../scss/styles.scss";
// import "./header";
// import "./footer";

// 페이지 새로고침
window.onpageshow = function (event) {
    if (event.persisted) {
        document.location.reload();
    }
};
