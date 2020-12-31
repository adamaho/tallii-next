// import { getToken } from "../utils";

import { DefaultApi, Configuration } from "./tallii";

import { config as appConfig } from "../constants";

// fetch implementation that gets the token from cookie storage
const fetchWithToken = (url: string, options?: RequestInit) => {
    // const token = getToken();

    const token = "";
    // gather the options
    const fetchOptions = {
        ...options,
        headers: {
            ...options?.headers,
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    };

    return fetch(url, fetchOptions);
};

// Tallii api representation
export const talliiAPI = () => {
    const config = new Configuration({
        basePath: appConfig.hostname,
        fetchApi: fetchWithToken
    });

    return new DefaultApi(config);
};