// import { getToken } from "../utils";

import { DefaultApi, Configuration } from "./tallii";

import { config as appConfig } from "../constants";

// fetch implementation that gets the token from cookie storage
const fetchWithToken = (url: string, options?: RequestInit) => {
    // const token = getToken();

    const token =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRhbWFobyIsImV4cCI6MTYxMDIyOTQxN30.sG59-sriYQ6VEkCp-8ZPo5czzf7JloscVwkskbAg4Cw";

    // gather the options
    const fetchOptions = {
        ...options,
        headers: {
            ...options?.headers,
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    return fetch(url, fetchOptions);
};

// Tallii api representation
export const talliiAPI = () => {
    const config = new Configuration({
        basePath: appConfig.hostname,
        fetchApi: fetchWithToken,
    });

    return new DefaultApi(config);
};
