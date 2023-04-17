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

const formValidation = (obj) => {
    if (!obj.name) {
        alert("사용자 이름을 입력해주세요.");
        return false;
    }

    if (!obj.password) {
        alert("비밀번호를 입력해주세요.");
        return false;
    }

    return true;
};

const onSubmitLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData($loginForm);

    let obj = {};

    for (let value of formData) {
        obj[value[0]] = value[1];
    }

    if (!formValidation(obj)) {
        return;
    }

    const res = await fetchLogin(obj);

    if (!res) return;

    alert("로그인 되었습니다.");
    location.href = "/";
};

export const setLoginModule = () => {
    $loginForm.onsubmit = onSubmitLogin;
};
