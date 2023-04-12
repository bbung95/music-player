import async from "regenerator-runtime";
import User from "../models/User";
import axios from "axios";
import { createToken } from "../utils/token";

export const login = async (req, res) => {
    return res.render("login", { pageTitle: "Login" });
};

export const signup = async (req, res) => {
    return res.render("signup", { pageTitle: "Signup" });
};

export const addUser = async (req, res) => {
    const body = req.body;

    const findUser = await User.findOne({ name: body.name });
    if (findUser) {
        return res.status(400).json("아이디가 존재합니다.");
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
    const token = await createToken(findUser);

    return res.json({ token });
};
