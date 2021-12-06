import { IAttachmentResponse, ICreateAttachment, IHttpFormat } from "../interfaces";
import axiosClient from "./axios.client";

const attachmentApi = {
    deleteBulkAttachment: (courseId: number, data: any) => {
        const url = `/v1/attachment/course/${courseId}`;
        return axiosClient.post<IHttpFormat<null>>(url, data);
    },
    createBulkAttachment: (refType: string, refId: number, courseId: number, data: { attachmentList: ICreateAttachment[] }) => {
        const url = `/v1/attachment/course/${courseId}/${refId}/${refType}`;
        return axiosClient.post<IHttpFormat<IAttachmentResponse[]>>(url, data);
    }
}

export default attachmentApi;