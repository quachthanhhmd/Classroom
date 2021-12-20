import { IHttpFormat } from "../interfaces";
import axiosClient from "./axios.client";

const notificationApi = {
    updateNotification: (notifyId: number) => {
        const url = `/v1/notification/${notifyId}/state`;
        return axiosClient.patch<IHttpFormat<null>>(url);
    }
}

export default notificationApi;