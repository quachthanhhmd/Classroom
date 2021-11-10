import { ICourseInfo, ICourseSummary, ICreateCourse, IHttpFormat, IUserCourse } from './../interfaces';
import axiosClient from "./axios.client";


const courseApi = {
    createCourse: (body: ICreateCourse) => {
        const url = "v1/course/";
        return axiosClient.post<IHttpFormat<ICourseSummary>>(url, body);
    },
    joinCourse: (code: string) => {
        const url = `v1/course/${code}`;
        return axiosClient.post<IHttpFormat<ICourseInfo>>(url);
    },
    getAllCourse: () => {
        const url = "v1/user/";
        return axiosClient.get<IHttpFormat<IUserCourse>>(url);
    },
    getAllInfor: (id: number) => {
        const url = `v1/course/${id}`;
        return axiosClient.get<IHttpFormat<ICourseInfo>>(url);
    }
}

export default courseApi;