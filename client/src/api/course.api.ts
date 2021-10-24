import { ICreateCourse, ICourseSummary, IUserCourse } from './../interfaces';
import axiosClient from "./axios.client";


const courseApi = {
    createCourse: (body: ICreateCourse) => {
        const url = "v1/course/";
        return axiosClient.post<ICourseSummary>(url, body);
    },
    getAllCourse: () => {
        const url = "v1/user/";
        return axiosClient.get<IUserCourse>(url);
    }
}

export default courseApi;