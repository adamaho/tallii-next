import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";

import { Token } from "../api/tallii";
import { GetServerSidePropsContext } from "next";

interface DecodedToken {
    sub: number;
    username: string;
    exp: string;
}

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
    cookies.set("authToken", data.token, {
        secure: false,
        maxAge: 60 * 60 * 24 * 7,
    });
};

/**
 * decodes the auth cookie
 */
export const decodeCookie = (
    context?: GetServerSidePropsContext
): { username: string; userId: number } => {
    let decodedToken: DecodedToken;

    if (context) {
        decodedToken = jwtDecode(context.req.cookies.authToken);
    } else {
        // get instance to cookie
        const cookies = new Cookies();

        const token = cookies.get("authToken");

        console.log(token);

        decodedToken = jwtDecode(token);
    }

    return {
        userId: decodedToken.sub,
        username: decodedToken.username,
    };
};
