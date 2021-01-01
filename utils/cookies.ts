import Cookies from "universal-cookie";

import {Token} from "../api/tallii";

/**
 * Sets the auth cookies
 */
export const setAuthCookies = (data: Token) => {
    // set get the expiry
    const maxAge = new Date();

    // add a day
    maxAge.setDate(maxAge.getDate() + 1);

    // get instance to cookie
    const cookies = new Cookies();

    // set authToken in cookie with max age of 7 days
    cookies.set("authToken", data.token, {secure: false, maxAge: 60 * 60 * 24 * 7});
}