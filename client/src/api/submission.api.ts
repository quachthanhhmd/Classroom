import { ICreateSubmission, IHttpFormat, ISubmissionResponse, ISubmissionSummary } from "../interfaces";
import axiosClient from "./axios.client";

const submissionApi = {
    getSubmission: (courseId: number, exerciseId: number) => {
        const url = `/v1/submission/course/${courseId}/exercise/${exerciseId}`;
        return axiosClient.get<IHttpFormat<ISubmissionResponse>>(url);
    },
    createSubmission: (courseId: number, exerciseId: number, data: ICreateSubmission) => {
        const url = `/v1/submission/course/${courseId}/exercise/${exerciseId}`;
        return axiosClient.post<IHttpFormat<ISubmissionResponse>>(url, data);
    },
    updateSubmission: (submissionId: number, courseId: number, data: any) => {
        const url = `/v1/submission/${submissionId}/course/${courseId}`;
        return axiosClient.patch<IHttpFormat<ISubmissionResponse>>(url, data);
    },
    getAllInExercise: (courseId: number, exerciseId: number) => {
        const url = `/v1/submission/course/${courseId}/exercise/${exerciseId}/all`;
        return axiosClient.get<IHttpFormat<ISubmissionSummary[]>>(url);
    },
    getSubmissionDetail: (courseId: number, submissionId: number) => {
        const url = `/v1/submission/${submissionId}/course/${courseId}`;
        return axiosClient.get<IHttpFormat<ISubmissionResponse>>(url);
    }
}

export default submissionApi