import {
    UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, DELETE_MESSAGE,
    UPDATE_PROFILE_SUCCESS
} from "../constants";
import { UPDATE_PROFILE_SUCCESS_MESSAGE } from "../messages";
import { IProfileBody, IUserAction } from './../interfaces/user.interface';

interface IInitState {
    isLoading: boolean,
    user: IProfileBody | null,
    message: string,
    isSuccess: boolean,
}

const initState: IInitState = {
    isLoading: false,
    user: null,
    message: "",
    isSuccess: false,
}

const userReducer = (state = initState, action: IUserAction) => {

    switch (action.type) {
        case DELETE_MESSAGE:
            return {
                ...state,
                message: ""
            }
        case UPDATE_PROFILE_FAIL:
            return {
                ...state,
                isLoading: false,
                error: "Update fail",
            }
        case UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                isLoading: true,
                message: "",
                isSuccess: false,
            }
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                message: UPDATE_PROFILE_SUCCESS_MESSAGE,
                isSuccess: true,
            }
        default:
            return {
                ...state,
            }
    }
}

export default userReducer;