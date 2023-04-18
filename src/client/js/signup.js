import axios from "axios";
import { async } from "regenerator-runtime";
import { get } from "./utils/module.js";

export const setSignupModule = () => {
    const $signupForm = get(".signup-form");
    const $signupNameInput = $signupForm.querySelector("input[name=name]");
    const $signupPasswordInput = $signupForm.querySelector("input[name=password]");
    const $signupNicknameInput = $signupForm.querySelector("input[name=nickname]");
    const $signupBtn = $signupForm.querySelector(".signup-btn");

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

    const formValidation = (obj) => {
        if (!obj.name) {
            alert("사용자 이름을 입력해주세요.");
            return false;
        }

        if (!obj.password) {
            alert("비밀번호를 입력해주세요.");
            return false;
        }

        if (!obj.nickname) {
            alert("닉네임을 입력해주세요.");
            return false;
        }

        return true;
    };

    const onClickSignup = async () => {
        let obj = {
            name: $signupNameInput.value,
            password: $signupPasswordInput.value,
            nickname: $signupNicknameInput.value,
        };

        if (!formValidation(obj)) {
            return;
        }

        const res = await fetchSignUp(obj);

        if (!res) return;

        alert("회원가입이 완료되었습니다.");
        location.href = "/login";
    };

    const formCheck = () => {
        const formData = new FormData($signupForm);

        let isCheck = true;

        for (let value of formData) {
            if (!value[1]) {
                isCheck = false;
            }
        }

        if (isCheck) {
            $signupBtn.classList.add("active");
            $signupBtn.disabled = false;
        } else {
            $signupBtn.classList.remove("active");
            $signupBtn.disabled = true;
        }
    };

    $signupBtn.onclick = onClickSignup;
    $signupNameInput.onkeyup = formCheck;
    $signupPasswordInput.onkeyup = formCheck;
    $signupNicknameInput.onkeyup = formCheck;
};
