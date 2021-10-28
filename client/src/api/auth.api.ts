import axiosClient from "./axios.client";
import {
    ISigninInput,
    ISigninRespone,
    IUserSummary,
    IHttpFormat,
    ISignUpInput,
    IRefreshToken,
    ILoginOAuth
} from "../interfaces";

const authApi = {
    signIn: (body: ISigninInput) => {
        const url = "/v1/auth/signin";
        return axiosClient.post<IHttpFormat<ISigninRespone>>(url, body);
    },
    signUp: (body: ISignUpInput) => {
        const url = "/v1/auth/signup";
        return axiosClient.post<IHttpFormat<null>>(url, body);
    },
    getInfo: (id: number) => {
        const url = `/v1/user/${id}`;
        return axiosClient.get<IHttpFormat<IUserSummary>>(url);
    },
    refeshToken: (body: IRefreshToken) => {
        const url = `/v1/auth/refresh-token`;
        return axiosClient.post<IHttpFormat<IRefreshToken>>(url, body);
    },
    logout: (body: IRefreshToken) => {
        const url = `/v1/auth/logout`;
        return axiosClient.post<IHttpFormat<IRefreshToken>>(url, body);
    },
    loginOAuth: (body: ILoginOAuth) => {
        const url = `/v1/auth/login-oauth`;
        return axiosClient.post<IHttpFormat<ISigninRespone>>(url, body);
    }
};

export default authApi;