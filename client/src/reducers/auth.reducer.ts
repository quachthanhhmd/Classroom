import jwt_decode from "jwt-decode";
import authApi from "../api/auth.api";
import { ISignInType, IUserSummary, IAuthenAction } from "../interfaces";
import env from "../configs/env";

import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_INFO_REQUEST,
    USER_INFO_SUCCESS,
    USER_INFO_FAIL,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_LOGOUT
} from "../constants";

interface IAuthState {
    isAuth: boolean,
    user: IUserSummary | null,
    isLoading: boolean,
    error?: string,
    signUpStatus?: string,

}

const initialState: IAuthState = {
    isAuth: false,
    user: null, // object -> info
    isLoading: false,
    error: "",
    signUpStatus: ""
};

const authReducer = (state = initialState, action: IAuthenAction) => {


    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: "",
                signUpStatus: "",
            };
        case USER_LOGIN_SUCCESS:
            action = (action as ISignInType);
            console.log(action.payload);
            const user = action.payload!.user;
            const token = action.payload!.token.access.token;
            const refreshToken = action.payload!.token.refresh.token;
            localStorage.setItem(env.REACT_APP_ACCESS_TOKEN, token);
            localStorage.setItem(env.REACT_APP_REFRESH_TOKEN, refreshToken);

            return {
                ...state,
                user,
                isAuth: true,
                isLoading: false,
                error: "",
                signUpStatus: "",
            };
        case USER_LOGIN_FAIL:
            return {
                ...state,
                isAuth: false,
                isLoading: false,
                error: USER_LOGIN_FAIL,
                signUpStatus: "",
            };
        case USER_INFO_REQUEST:
            return {
                ...state,
                isLoading: true,
                signUpStatus: "",
            };
        case USER_INFO_SUCCESS:
            return {
                ...state,
                user: (action.payload as IUserSummary),
                isLoading: false,
                isAuth: true,
                signUpStatus: "",
            };
        case USER_INFO_FAIL:
            return {
                ...state,
                user: null,
                isLoading: false,
                isAuth: false,
                signUpStatus: "",
            };
        case USER_REGISTER_FAIL:
            return {
                ...state,
                user: null,
                isLoading: false,
                isAuth: false,
                signUpStatus: USER_REGISTER_FAIL
            };
        case USER_REGISTER_REQUEST:
            return {
                ...state,
                user: null,
                isLoading: true,
                isAuth: false,
                signUpStatus: USER_REGISTER_REQUEST,
            }
        case USER_REGISTER_SUCCESS:

            return {
                ...state,
                user: null,
                isLoading: true,
                isAuth: false,
                signUpStatus: USER_REGISTER_SUCCESS
            }
        case USER_LOGOUT:
            localStorage.removeItem(env.REACT_APP_ACCESS_TOKEN);
            localStorage.removeItem(env.REACT_APP_REFRESH_TOKEN);
            return {
                ...state,
                user: null,
                isLoading: false,
                isAuth: false,
                signUpStatus: ""
            }
        default:
            return {
                ...state
            }
    }
}

export default authReducer;