import jwt from "jsonwebtoken"
// import dotenv from "dotenv"
// dotenv.config()

export const generateToken = (userId, res) => {
    //userId field is given in token which can be later used to fetch the user by accessing this token from the cookie
    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,//ms equivalent to 7 days
        httpOnly: true, //prevents xss attacks : cross-site scripting attacks (makes it inaccessible to any javascript)
        sameSite: "strict", //prevents CSRF attacks : Cross-Site request forgery attacks
        secure: process.env.NODE_ENV !== "development"
    })

    return token;
}