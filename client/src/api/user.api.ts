import { IHttpFormat, IProfileBody,IChangePassword } from './../interfaces';
import axiosClient from "./axios.client";


const userApi = {
    updateProfile: (body: IProfileBody) => {
        const url = "/v1/user";
        return  axiosClient.patch<IHttpFormat<IProfileBody>>(url, body);
    },
    updatePassword: (body: IChangePassword) => {
        const url = "v1/user/change-password";
        return axiosClient.patch<IHttpFormat<null>>(url, body);
    }
}

export default userApi;