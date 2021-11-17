import { GET_ROLE_MEMBER_FAIL, GET_ROLE_MEMBER_SUCCESS, INVITE_MEMBER_FAIL, INVITE_MEMBER_REQUEST, INVITE_MEMBER_SUCCESS } from '../constants/member.constant';
import { IRoleMemberResponse } from "../interfaces";
import { UPSERT_STUDENT_ID_FAIL, UPSERT_STUDENT_ID_SUCCESS, UPSERT_STUDENT_ID_REQUEST } from './../constants/member.constant';
import { IMemberAction } from './../interfaces/member.interface';

interface IInitState {
    currentRole: IRoleMemberResponse | null,
    isLoading: boolean,
    errorMessage: string
    isSuccess: boolean
}
const initState: IInitState = {
    currentRole: null,
    isLoading: false,
    errorMessage: "",
    isSuccess: false,
}

const memberReducer = (state = initState, action: IMemberAction): IInitState => {

    switch (action.type) {
        case GET_ROLE_MEMBER_SUCCESS:
            return {
                ...state,
                currentRole: action.payload as IRoleMemberResponse,
            }
        case GET_ROLE_MEMBER_FAIL:
            return {
                ...state,
                currentRole: null
            }
        case INVITE_MEMBER_REQUEST:
            return {
                ...state,
                isLoading: true,
                errorMessage: ""
            }
        case INVITE_MEMBER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errorMessage: "",
                isSuccess: true,
            }
        case INVITE_MEMBER_FAIL:
            return {
                ...state,
                isLoading: false,
                errorMessage: "",
                isSuccess: false,
            }
        case UPSERT_STUDENT_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errorMessage: "",
                isSuccess: true,
            }
        case UPSERT_STUDENT_ID_FAIL:
            return {
                ...state,
                isLoading: false,
                errorMessage: "Student ID Exist",
                isSuccess: false,
            }
        case UPSERT_STUDENT_ID_REQUEST:
            return {
                ...state,
                isLoading: false,
                errorMessage: "",
                isSuccess: false,
            }
        default:
            return {
                ...state,
            }
    }
}

export default memberReducer;