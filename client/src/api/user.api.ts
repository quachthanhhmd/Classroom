import { IHttpFormat, IProfileBody } from './../interfaces';
import axiosClient from "./axios.client";


const userApi = {
    updateProfile: (body: IProfileBody) => {
        const url = "/v1/user";
        return  axiosClient.patch<IHttpFormat<IProfileBody>>(url, body);
    }
}

export default userApi;