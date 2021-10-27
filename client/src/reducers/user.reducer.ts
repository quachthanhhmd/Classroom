import {
    UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS
} from "../constants";
import { IProfileBody, IUserAction } from './../interfaces/user.interface';

interface IInitState {
    isLoading: boolean,
    user: IProfileBody | null,
    error: string,
}

const initState: IInitState = {
    isLoading: false,
    user: null,
    error: ""
}

const userReducer = (state = initState, action: IUserAction) => {

    switch (action.type) {
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
                error: ""
            }
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                isLoading: false,
            }
        default:
            return {
                ...state,
            }
    }
}

export default userReducer;