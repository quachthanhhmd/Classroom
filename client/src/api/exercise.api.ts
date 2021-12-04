import { IChangeOrder, ICreateExercise, ICreateExerciseType, IExerciseThumbnail, IExerciseTypeDetail, IHttpFormat } from "../interfaces";
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
    }
}

export default exerciseApi;