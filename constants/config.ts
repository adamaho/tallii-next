const DEV_CONFIG = {
  hostname: "http://192.168.179.192:8000",
};

const PROD_CONFIG = {
  hostname: "https://api.tallii.io",
};

export const config =
  process.env.NODE_ENV === "development" ? DEV_CONFIG : PROD_CONFIG;
