import axiosClient from "./axios.client";
import { IHttpFormat, IRoleMemberResponse, IUpsertStudentIDBody } from './../interfaces';


const memberApi = {
    upsertStudentId: (courseId: number, studentId: string) => {
        const url = `/v1/member/upsert`;
        return axiosClient.post<IHttpFormat<null>>(url, { courseId, studentId });
    },
    getMemberRole: (courseId: number) => {
        const url = `/v1/member/${courseId}`;
        return axiosClient.get<IHttpFormat<IRoleMemberResponse>>(url);
    },
    inviteMemberByEmail: (courseId: number, email: string, role: string) => {
        const url = `/v1/member/invite/${courseId}`;
        return axiosClient.post<IHttpFormat<null>>(url, { courseId, email, role });
    },
    updateMemberState: (userId: number, courseId: number, state: string) => {
        const url = `/v1/member/update/${courseId}/${userId}`;
        return axiosClient.patch<IHttpFormat<{userId: number}>>(url, {state});
    },
    importMemberList: (courseId: number, data: any) => {
        const url = `/v1/member/course/${courseId}/import-student-list`;
        return axiosClient.post(url, data)
    }
}
export default memberApi;