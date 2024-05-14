import {IronSessionOptions} from "iron-session";

export const IronSessionOption:IronSessionOptions = {
    cookieName: "cookie_cookie",
    password: process.env.SESSION_COOKIE ? process.env.SESSION_COOKIE : '',
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
        secure: false,
        sameSite: "strict",
        maxAge:60 * 60000,
        httpOnly: false
    }
}