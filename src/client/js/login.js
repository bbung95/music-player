import axios from "axios";
import { async } from "regenerator-runtime";
import { get } from "./utils/module.js";

export const setLoginModule = () => {
    const $loginForm = get(".login-form");
    const $loginNameInput = $loginForm.querySelector("input[name=name]");
    const $loginPasswordInput = $loginForm.querySelector("input[name=password]");
    const $loginBtn = $loginForm.querySelector(".login-btn");

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

    const onClickLogin = async () => {
        let obj = { name: $loginNameInput.value, password: $loginPasswordInput.value };

        if (!formValidation(obj)) {
            return;
        }

        const res = await fetchLogin(obj);

        if (!res) return;

        alert("로그인 되었습니다.");
        location.href = "/";
    };

    const formCheck = () => {
        const formData = new FormData($loginForm);

        let isCheck = true;

        for (let value of formData) {
            if (!value[1]) {
                isCheck = false;
            }
        }

        if (isCheck) {
            $loginBtn.classList.add("active");
            $loginBtn.disabled = false;
        } else {
            $loginBtn.classList.remove("active");
            $loginBtn.disabled = true;
        }
    };

    $loginBtn.onclick = onClickLogin;
    $loginNameInput.onkeyup = formCheck;
    $loginPasswordInput.onkeyup = formCheck;
};
