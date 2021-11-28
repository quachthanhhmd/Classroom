import { IChangeOrder, ICreateExerciseType, IExerciseTypeDetail, IHttpFormat } from "../interfaces";
import axiosClient from "./axios.client";


const exerciseApi = {
    createExerciseType: (courseId: number, data: ICreateExerciseType) => {
        const url = `/v1/exercise-type/course/${courseId}`;
        return axiosClient.post<IHttpFormat<IExerciseTypeDetail>>(url, data);
    },
    updateExerciseType: (courseId: number, typeId: number, data: ICreateExerciseType) => {
        const url = `/v1/exercise-type/${typeId}/course/${courseId}`;
        return axiosClient.patch<IHttpFormat<IExerciseTypeDetail>>(url, data);
    },
    deleteExerciseType: (typeId: number) => {
        const url = `/v1/exercise-type/${typeId}`;
        return axiosClient.delete<IHttpFormat<null>>(url);
    },
    changeOrderType: (courseId: number, data: IChangeOrder[]) => {
        console.log(data);
        const url = `/v1/exercise-type/course/${courseId}/order`;
        return axiosClient.post<IHttpFormat<IExerciseTypeDetail[]>>(url, data);
    }
}

export default exerciseApi;