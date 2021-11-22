import { GET_ROLE_MEMBER_FAIL, GET_ROLE_MEMBER_SUCCESS, DELETE_MESSAGE, INVITE_MEMBER_FAIL, INVITE_MEMBER_REQUEST, INVITE_MEMBER_SUCCESS } from '../constants';
import { IRoleMemberResponse } from "../interfaces";
import { INVITE_MESSAGE_FAIL, INVITE_MESSAGE_SUCCESS } from '../messages';
import { UPSERT_STUDENT_ID_FAIL, UPSERT_STUDENT_ID_SUCCESS, UPSERT_STUDENT_ID_REQUEST } from './../constants/member.constant';
import { IMemberAction } from './../interfaces/member.interface';

interface IInitState {
    currentRole: IRoleMemberResponse | null,
    isLoading: boolean,
    message: string
    isSuccess: boolean
}
const initState: IInitState = {
    currentRole: null,
    isLoading: false,
    message: "",
    isSuccess: false,
}

const memberReducer = (state = initState, action: IMemberAction): IInitState => {

    switch (action.type) {
        case DELETE_MESSAGE:
            return {
                ...state,
                message: ""
            }
        case GET_ROLE_MEMBER_SUCCESS:
            return {
                ...state,
                currentRole: action.payload as IRoleMemberResponse,
                isLoading: true,
            }
        case GET_ROLE_MEMBER_FAIL:
            return {
                ...state,
                currentRole: null,
                isLoading: false,
            }
        case INVITE_MEMBER_REQUEST:
            return {
                ...state,
                isLoading: true,
                message: "",
                isSuccess: false,
            }
        case INVITE_MEMBER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                message: INVITE_MESSAGE_SUCCESS,
                isSuccess: true,
            }
        case INVITE_MEMBER_FAIL:
            return {
                ...state,
                isLoading: false,
                message: INVITE_MESSAGE_FAIL,
                isSuccess: false,
            }
        case UPSERT_STUDENT_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                message: "",
                isSuccess: true,
            }
        case UPSERT_STUDENT_ID_FAIL:
            return {
                ...state,
                isLoading: false,
                message: "Student ID Exist",
                isSuccess: false,
            }
        case UPSERT_STUDENT_ID_REQUEST:
            return {
                ...state,
                isLoading: true,
                message: "",
                isSuccess: false,
            }
        default:
            return {
                ...state,
            }
    }
}

export default memberReducer;