import axios from "axios";
import queryString from "query-string";

import env from "../configs/env";


const axiosClient = axios.create({
  baseURL: env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config: any) => {
  const token =
    localStorage.getItem(env.REACT_APP_ACCESS_TOKEN) || null;
  config.headers["Authorization"] = `Bearer ${token}`;

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    // if (response && response.data) {
    //   return response.data;
    // }
    return response;
  },
  (error) => {
    const originalRequest = error.config;
  
    if (error.response.status === 401) {
      if (originalRequest.url === "/v1/auth/refresh-token" || !localStorage.getItem(env.REACT_APP_REFRESH_TOKEN)) {
        localStorage.removeItem(env.REACT_APP_ACCESS_TOKEN);
        localStorage.removeItem(env.REACT_APP_REFRESH_TOKEN);
        return;
      }
      axiosClient
        .post("/v1/auth/refresh-token", {
          refreshToken:
            localStorage.getItem(env.REACT_APP_REFRESH_TOKEN),
        })
        .then((res: any) => {
       
          if (res && res.data.payload) {
            localStorage.setItem(
              env.REACT_APP_ACCESS_TOKEN,
              res.data.payload.access.token
            );
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${res.data.payload.access.token}`;
            axiosClient(originalRequest);
          }
        })
        .catch((error) => {
          console.log(error);
          localStorage.removeItem(env.REACT_APP_ACCESS_TOKEN);
          localStorage.removeItem(env.REACT_APP_REFRESH_TOKEN);
        });
    }
    console.log(error);
    return Promise.reject(error)
  }
);

export default axiosClient;