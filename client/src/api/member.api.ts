import axiosClient from "./axios.client";
import { IHttpFormat, IRoleMemberResponse, IUpsertStudentIDBody } from './../interfaces';


const memberApi = {
    upsertStudentId: async (courseId: number, studentId: string) => {
        const url = `/v1/member/upsert`;
        return await axiosClient.post<IHttpFormat<null>>(url, {courseId, studentId});
    },
    getMemberRole: async (courseId: number) => {
        const url = `/v1/member/${courseId}`;
        return await axiosClient.get<IHttpFormat<IRoleMemberResponse>>(url);
    }
}
export default memberApi;