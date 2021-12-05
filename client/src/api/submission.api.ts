import { ICreateSubmission, IHttpFormat, ISubmissionResponse } from "../interfaces";
import axiosClient from "./axios.client";

const submissionApi = {
    getSubmission: (courseId: number, exerciseId: number) => {
        const url = `/v1/submission/course/${courseId}/exercise/${exerciseId}`;
        return axiosClient.get<IHttpFormat<ISubmissionResponse>>(url);
    },
    createSubmission: (courseId: number, exerciseId: number, data: ICreateSubmission) => {
        console.log(data);
        const url = `/v1/submission/course/${courseId}/exercise/${exerciseId}`;
        return axiosClient.post<IHttpFormat<ISubmissionResponse>>(url, data);
    }
}

export default submissionApi