import axiosClient from "./axios.client";
import { ISigninInput, ISigninRespone, IUserSummary, IHttpFormat } from "../interfaces";

const authApi = {
    signIn: (body: ISigninInput) => {
        const url = "/v1/auth/signin";
        return axiosClient.post<IHttpFormat<ISigninRespone>>(url, body);
    },
    // signUp: (body) => {
    //     const url = "/v1/auth/signup";
    //     return axiosClient.post(url, body);
    // },
    getInfo: (id: number) => {
        const url = `/v1/user/${id}`;
        return axiosClient.get<IHttpFormat<IUserSummary>>(url);
    },
};

export default authApi;