export const IronSessionOption = {
    cookieName: "cookie_cookie",
    password: "DAj5CTuS%R08K#DOr!X?dbundefinedMI6m5RA$Egr5^&2T#*Bi@XrkM9UHP^q^IPyhFI2jlPm@WvIN6CX&5lZk2JH3UQ@ifZRundefinedLiMIBSxTJ",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
        maxAge:60 * 60000,
    }
}