
import { CREATE_EXERCISE_TYPE_FAIL, CREATE_EXERCISE_TYPE_REQUEST, CREATE_EXERCISE_TYPE_SUCCESS, DELETE_EXERCISE_TYPE_FAIL, DELETE_EXERCISE_TYPE_REQUEST, DELETE_EXERCISE_TYPE_SUCCESS, UPDATE_EXERCISE_TYPE_FAIL, UPDATE_EXERCISE_TYPE_REQUEST, UPDATE_EXERCISE_TYPE_SUCCESS } from "../constants";
import { IExerciseAction } from "../interfaces";

const initialState = {
    message: "",
    isLoading: false,
    isSuccess: false,
}

const exerciseReducer = (state = initialState, action: IExerciseAction) => {

    switch (action.type) {
        case DELETE_EXERCISE_TYPE_FAIL:
        case UPDATE_EXERCISE_TYPE_FAIL:
        case CREATE_EXERCISE_TYPE_FAIL:
            return {
                ...state,
                message: "",
                isLoading: false,
                isSuccess: false,
            }
        case DELETE_EXERCISE_TYPE_SUCCESS:
        case UPDATE_EXERCISE_TYPE_SUCCESS:
        case CREATE_EXERCISE_TYPE_SUCCESS:
            return {
                ...state,
                message: "",
                isLoading: false,
                isSuccess: true,
            }
        case DELETE_EXERCISE_TYPE_REQUEST:
        case UPDATE_EXERCISE_TYPE_REQUEST:
        case CREATE_EXERCISE_TYPE_REQUEST:
            return {
                ...state,
                message: "",
                isLoading: true,
                isSuccess: false,
            }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default exerciseReducer;