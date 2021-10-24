import { ICreateCourse, ICourseSummary, IUserCourse, IHttpFormat } from './../interfaces';
import axiosClient from "./axios.client";


const courseApi = {
    createCourse: (body: ICreateCourse) => {
        const url = "v1/course/";
        return axiosClient.post<IHttpFormat<ICourseSummary>>(url, body);
    },
    getAllCourse: () => {
        const url = "v1/user/";
        return axiosClient.get<IHttpFormat<IUserCourse>>(url);
    }
}

export default courseApi;