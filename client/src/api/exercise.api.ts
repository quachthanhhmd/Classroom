import { IChangeOrder, ICreateExercise, ICreateExerciseType, IDeadlineResponse, IExerciseThumbnail, IExerciseTypeDetail, IHttpFormat } from "../interfaces";
import axiosClient from "./axios.client";


const exerciseApi = {
    getAllExercise: (courseId: number) => {
        const url = `/v1/exercise/course/${courseId}`;
        return axiosClient.get<IHttpFormat<IExerciseThumbnail[]>>(url);
    },
    createExerciseType: (courseId: number, data: ICreateExerciseType) => {
        const url = `/v1/exercise-type/course/${courseId}`;
        return axiosClient.post<IHttpFormat<IExerciseTypeDetail>>(url, data);
    },
    updateExerciseType: (courseId: number, typeId: number, data: ICreateExerciseType) => {
        const url = `/v1/exercise-type/${typeId}/course/${courseId}`;
        return axiosClient.patch<IHttpFormat<IExerciseTypeDetail>>(url, data);
    },
    deleteExerciseType: (typeId: number, courseId: number) => {
        const url = `/v1/exercise-type/${typeId}/course/${courseId}`;
        return axiosClient.delete<IHttpFormat<null>>(url);
    },
    changeOrderType: (courseId: number, data: IChangeOrder[]) => {
        const url = `/v1/exercise-type/course/${courseId}/order`;
        return axiosClient.post<IHttpFormat<IExerciseTypeDetail[]>>(url, data);
    },
    createExercise: (courseId: number, data: ICreateExercise) => {
        console.log(data);
        const url = `/v1/exercise/course/${courseId}`;
        return axiosClient.post<IHttpFormat<IExerciseThumbnail>>(url, data);
    },
    getOneExercise: (courseId: number, postId: number) => {
        const url = `/v1/exercise/course/${courseId}/post/${postId}`;
        return axiosClient.get<IHttpFormat<any>>(url);
    },
    getDeadlineList: (courseId: number) => {
        const url = `/v1/exercise/course/${courseId}/deadline`;
        return axiosClient.get<IHttpFormat<IDeadlineResponse[]>>(url);
    },
    importExercise: (courseId: number, exerciseId: number, data: any) => {
        const url = `/v1/exercise/${exerciseId}/course/${courseId}/import-grade-exercise`;
        return axiosClient.post(url, data);
    },
    exportExercise: (courseId: number, exerciseId: number) => {
        const url = `/v1/exercise/${exerciseId}/course/${courseId}/export-grade-exercise`;
        return axiosClient.get<IHttpFormat<string>>(url);
    },
    updateExercise: (courseId: number, exerciseId: number, data) => {
        const url = `/v1/exercise/${exerciseId}/course/${courseId}`;
        return axiosClient.patch<IHttpFormat<null>>(url, data);
    }
}

export default exerciseApi;