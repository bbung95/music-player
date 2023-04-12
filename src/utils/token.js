import jwt from "jsonwebtoken";
import { async } from "regenerator-runtime";

export const createToken = async (user) => {
    jwt.sign(
        {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: "bbung",
        },
        "secret"
    );

    const token = await jwt.sign({ id: user.id, name: user.name }, process.env.TOKEN_SECRET_KEY);

    return token;
};
