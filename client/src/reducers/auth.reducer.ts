import { INotification } from './../interfaces/notification.interface';
import env from "../configs/env";
import {
    DELETE_MESSAGE, UPDATE_NOTIFY, USER_INFO_FAIL, USER_INFO_REQUEST,
    USER_INFO_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_OAUTH_FAIL, USER_LOGIN_OAUTH_REQUEST,
    USER_LOGIN_OAUTH_SUCCESS, USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_HEADER
} from "../constants";
import { IAuthenAction, ISignInType, IUserSummary } from "../interfaces";
import { LOGIN_FAIL, SIGNUP_FAIL } from "../messages";
import { SIGNUP_SUCCESS } from './../messages/auth.message';


interface IAuthState {
    isAuth: boolean,
    user: IUserSummary | null,
    isLoading: boolean,
    message?: string,
    isSuccess: boolean,
}

const initialState: IAuthState = {
    isAuth: false,
    user: null, // object -> info
    isLoading: false,
    message: "",
    isSuccess: false,
};

const authReducer = (state = initialState, action: IAuthenAction) => {
    switch (action.type) {
        case DELETE_MESSAGE:
            console.log("xoa r ne haha")
            return {
                ...state,
                message: ""
            }
        case USER_LOGIN_OAUTH_REQUEST:
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                message: "",
                isSuccess: false,
            };
        case USER_LOGIN_OAUTH_SUCCESS:
        case USER_LOGIN_SUCCESS:
            action = (action as ISignInType);
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
                message: "",
                isSuccess: true,
            };
        case USER_LOGIN_OAUTH_FAIL:
        case USER_LOGIN_FAIL:
            return {
                ...state,
                isAuth: false,
                isLoading: false,
                message: LOGIN_FAIL,
                isSuccess: false,
            };
        case USER_INFO_REQUEST:
            return {
                ...state,
                isLoading: true,
                message: "",
                isSuccess: false,
            };
        case USER_INFO_SUCCESS:
            return {
                ...state,
                user: (action.payload as IUserSummary),
                isLoading: false,
                isAuth: true,
                message: "",
                isSuccess: true,
            };
        case USER_INFO_FAIL:
            return {
                ...state,
                user: null,
                isLoading: false,
                isAuth: false,
                message: USER_INFO_FAIL,
                isSuccess: false,
            };
        case USER_REGISTER_FAIL:
            return {
                ...state,
                user: null,
                isLoading: false,
                isAuth: false,
                message: SIGNUP_FAIL,
                isSuccess: false,
            };
        case USER_REGISTER_REQUEST:
            return {
                ...state,
                user: null,
                isLoading: true,
                isAuth: false,
                message: "",
                isSuccess: false,
            }
        case USER_REGISTER_SUCCESS:

            return {
                ...state,
                user: null,
                isLoading: true,
                isAuth: false,
                message: SIGNUP_SUCCESS,
                isSuccess: true,
            }
        case USER_UPDATE_HEADER:
            return {
                ...state,
                user: (action.payload as IUserSummary),
            }
        case USER_LOGOUT: {
            localStorage.removeItem(env.REACT_APP_ACCESS_TOKEN);
            localStorage.removeItem(env.REACT_APP_REFRESH_TOKEN);
            return {
                ...state,
                user: null,
                isLoading: false,
                isAuth: false,
                message: "",
                isSuccess: true,
            }
        }
        case UPDATE_NOTIFY: {
            const newState = state!.user;
            const notifyId = action.payload as number;
            console.log(123123);
            if (newState?.notifyList) {
                const newNotification = newState.notifyList.map((notify) => {
                    if (notify.id === notifyId) {
                        notify.isRead = true;
                        return notify;
                    }
                    return notify;
                });
                newState.notifyList = [...newNotification];
            }
            console.log(newState);
            return {
                ...state,
                user: newState,
            }
        }
        default:
            return {
                ...state
            }
    }
}

export default authReducer;