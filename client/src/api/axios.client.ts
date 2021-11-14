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
    console.log(error);
    if (error.response.status === 401) {
      console.log("loi o day ne", originalRequest)
      if (originalRequest.url === "/v1/auth/refresh-token") {
        localStorage.removeItem(env.REACT_APP_ACCESS_TOKEN);
        localStorage.removeItem(env.REACT_APP_REFRESH_TOKEN);
        return;
      }
      if (!localStorage.getItem(env.REACT_APP_REFRESH_TOKEN)) {
        axiosClient(originalRequest);
      }
      axiosClient
        .post("/v1/auth/refresh-token", {
          refreshToken:
            localStorage.getItem(env.REACT_APP_REFRESH_TOKEN),
        })
        .then((res: any) => {
          console.log(res);
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
  }
);

export default axiosClient;