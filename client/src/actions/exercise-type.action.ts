import exerciseApi from "../api/exercise.api";
import { CREATE_EXERCISE_TYPE_FAIL, CREATE_EXERCISE_TYPE_REQUEST, CREATE_EXERCISE_TYPE_SUCCESS, DELETE_EXERCISE_TYPE_SUCCESS, UPDATE_EXERCISE_TYPE_FAIL, UPDATE_EXERCISE_TYPE_REQUEST, UPDATE_EXERCISE_TYPE_SUCCESS, UPDATE_ORDER_CHANGE_SUCCESS } from "../constants";
import { IChangeOrder, ICreateExerciseType, IExerciseAction } from "../interfaces";


export const createExerciseType = (courseId: number, data: ICreateExerciseType) =>
    async (dispatch: (args: IExerciseAction) => (IExerciseAction)) => {
        try {
            dispatch({
                type: CREATE_EXERCISE_TYPE_REQUEST
            });

            const result = await exerciseApi.createExerciseType(courseId, data);
            console.log(result);
            if (result.data.code !== 200) throw new Error();

            dispatch({
                type: CREATE_EXERCISE_TYPE_SUCCESS,
                payload: result.data.payload
            });
        } catch (err) {
            dispatch({
                type: CREATE_EXERCISE_TYPE_FAIL
            })
        }
    }

export const updateExerciseType = (courseId: number, typeId: number, data: ICreateExerciseType) =>
    async (dispatch: (args: IExerciseAction) => (IExerciseAction)) => {
        try {
            dispatch({
                type: UPDATE_EXERCISE_TYPE_REQUEST
            })

            const result = await exerciseApi.updateExerciseType(courseId, typeId, data);

            if (result.data.code !== 200) throw new Error();

            dispatch({
                type: UPDATE_EXERCISE_TYPE_SUCCESS,
                payload: result.data.payload
            });

        } catch (err) {
            dispatch({
                type: UPDATE_EXERCISE_TYPE_FAIL,
            });
        }
    }

export const deleteExerciseType = (typeId: number, courseId: number) =>
    async (dispatch: (args: IExerciseAction) => (IExerciseAction)) => {
        try {
            const result = await exerciseApi.deleteExerciseType(typeId, courseId);

            if (result.data.code !== 200) throw new Error();
            dispatch({
                type: DELETE_EXERCISE_TYPE_SUCCESS,
                payload: { id: typeId }
            })
        } catch (err) {

        }
    }

export const changeOrderType = (courseId: number, data: IChangeOrder[]) =>
    async (dispatch: (args: IExerciseAction) => (IExerciseAction)) => {
        try {

            const result = await exerciseApi.changeOrderType(courseId, data);
            if (result.data.code !== 200) throw new Error();

            dispatch({
                type: UPDATE_ORDER_CHANGE_SUCCESS,
                payload: result.data.payload
            })
        } catch (err) {

        }
    }