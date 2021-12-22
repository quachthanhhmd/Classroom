import { ICourseInfo, ICreateCourse, IHttpFormat, IMemberSummary, IPostResponse, IUserCourse } from './../interfaces';
import { IUpdateCourseInput } from './../interfaces/course.interface';
import axiosClient from "./axios.client";


const courseApi = {
    createCourse: (body: ICreateCourse) => {
        const url = "v1/course/";
        return axiosClient.post<IHttpFormat<ICourseInfo>>(url, body);
    },
    joinCourse: (code: string) => {
        const url = `v1/course/join/${code}`;
        return axiosClient.post<IHttpFormat<ICourseInfo>>(url);
    },
    joinCourseByUrl: (courseId: number, code: string) => {
        const url = `v1/course/${courseId}?give=${code}`;
        return axiosClient.patch<IHttpFormat<null>>(url)
    },
    getAllCourse: () => {
        const url = "v1/user/";
        return axiosClient.get<IHttpFormat<IUserCourse>>(url);
    },
    getAllInfor: (id: number) => {
        const url = `v1/course/${id}`;
        return axiosClient.get<IHttpFormat<ICourseInfo>>(url);
    },
    getAllMemberInCourse: (id: number) => {
        const url = `v1/member/all/${id}`;
        return axiosClient.get<IHttpFormat<IMemberSummary[]>>(url);
    },
    joinCourseByToken: (courseId: number, token: string, role: string) => {
        const url = `v1/course/invite/${courseId}?token=${token}&role=${role}`
        return axiosClient.patch<IHttpFormat<null>>(url);
    },
    updateCourseInfo: (courseId: number, body: IUpdateCourseInput) => {
        const url = `v1/course/update/${courseId}`;
        return axiosClient.patch<IHttpFormat<ICourseInfo>>(url, body);
    },
    getAllPost: (courseId: number) => {
        const url = `v1/course/${courseId}/post`;
        return axiosClient.get<IHttpFormat<IPostResponse>>(url);
    },
    getStudentList: (courseId: number) => {
        const url = `v1/course/${courseId}/member/student-auth`;
        return axiosClient.get<IHttpFormat<any[]>>(url);
    },
    exportGradeBoard: (courseId: number) => {
        const url = `v1/course/${courseId}/grade-board`;
        return axiosClient.get<IHttpFormat<string>>(url);
    }
}

export default courseApi;