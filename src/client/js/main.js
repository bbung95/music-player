import "../scss/styles.scss";
// import "./footer";
import { setSearchModule } from "./search";
import { setLoginModule } from "./login.js";
import { setSignupModule } from "./signup.js";

// 페이지 새로고침
window.onpageshow = function (event) {
    if (event.persisted) {
        document.location.reload();
    }
};

const path = window.location.pathname;

switch (path) {
    case "/login":
        setLoginModule();
        break;
    case "/signup":
        setSignupModule();
        break;
    case "/search":
        setSearchModule();
        break;
}
