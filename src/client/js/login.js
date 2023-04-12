import axios from "axios";
import { async } from "regenerator-runtime";
import { get } from "./utils/module.js";

const $loginForm = get(".login-form");

const fetchLogin = async (values) => {
    const res = await axios({
        method: "post",
        url: "/api/login",
        headers: {
            "Content-Type": "application/json",
        },
        data: values,
    }).catch((e) => {
        if (e) {
            alert(e.response.data);
            return false;
        }
    });

    return res;
};

const onSubmitLogin = async (e) => {
    e.preventDefault();

    const res = await fetchLogin({ name: "bbung", password: "1234" });

    if (!res) return;

    localStorage.setItem("token", res.data.token);
    alert("로그인 되었습니다.");
};

export const setLoginModule = () => {
    $loginForm.onsubmit = onSubmitLogin;
};
