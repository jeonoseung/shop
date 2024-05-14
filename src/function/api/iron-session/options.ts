export const IronSessionOption = {
    cookieName: "cookie_cookie",
    password: process.env.SESSION_COOKIE ? process.env.SESSION_COOKIE : '',
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
        secure: false,
        sameSite: true,
        maxAge:60 * 60000,
        httpOnly: false
    }
}