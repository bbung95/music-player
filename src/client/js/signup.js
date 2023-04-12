import axios from "axios";
import { async } from "regenerator-runtime";
import { get } from "./utils/module.js";

const $signupForm = get(".signup-form");

const fetchSignUp = async (values) => {
    const res = await axios({
        method: "post",
        url: "/api/signup",
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

const onSubmitSignup = async (e) => {
    e.preventDefault();

    const res = await fetchSignUp({ name: "bbung", password: "1234" });

    if (!res) return;

    alert("회원가입이 완료되었습니다.");
    location.href = "/login";
};

export const setSignupModule = () => {
    $signupForm.onsubmit = onSubmitSignup;
};
