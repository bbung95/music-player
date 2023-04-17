import async from "regenerator-runtime";
import User from "../models/User";
import axios from "axios";

export const login = async (req, res) => {
    const session = res.locals;

    if (session.loggedIn) {
        return res.redirect("/");
    }

    return res.render("login", { pageTitle: "Login" });
};

export const signup = async (req, res) => {
    const session = res.locals;

    if (session.loggedIn) {
        return res.redirect("/");
    }

    return res.render("signup", { pageTitle: "Signup" });
};

export const addUser = async (req, res) => {
    const body = req.body;

    const findName = await User.findOne({ name: body.name });
    if (findName) {
        return res.status(400).json("아이디가 존재합니다.");
    }

    const findNickname = await User.findOne({ nickname: body.nickname });

    if (findNickname) {
        return res.status(400).json("닉네임이 존재합니다.");
    }

    const user = new User(body);
    await user.save();

    return res.json();
};

export const loginUser = async (req, res) => {
    const user = req.body;

    const findUser = await User.findOne({ name: user.name, password: user.password });
    if (!findUser) {
        return res.status(400).json("아이디 또는 비밀번호가 틀렸습니다.");
    }

    req.session.user = { _id: findUser._id, name: findUser.name, nickname: findUser.nickname };
    req.session.loggedIn = true;
    req.session.save();

    return res.json();
};

export const logoutUser = async (req, res) => {
    req.session.destroy();
    return res.json();
};
