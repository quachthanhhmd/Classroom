import { IHttpFormat, INotification } from "../interfaces";
import axiosClient from "./axios.client";

const notificationApi = {
    updateNotification: (notifyId: number) => {
        const url = `/v1/notification/${notifyId}/state`;
        return axiosClient.patch<IHttpFormat<null>>(url);
    },
    getNotificationUser: () => {
        const url = `/v1/notification`;
        return axiosClient.get<IHttpFormat<INotification[]>>(url);
    }
}

export default notificationApi;