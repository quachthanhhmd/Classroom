import { IMemberAction } from './../interfaces/member.interface';
import { IRoleMemberResponse } from "../interfaces"
import { GET_ROLE_MEMBER_FAIL, GET_ROLE_MEMBER_SUCCESS, INVITE_MEMBER_REQUEST, INVITE_MEMBER_SUCCESS, INVITE_MEMBER_FAIL } from '../constants/member.constant';

interface IInitState {
    currentRole: IRoleMemberResponse | null,
    isLoading: boolean,
    errorMessage: string

}
const initState: IInitState = {
    currentRole: null,
    isLoading: false,
    errorMessage: ""
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
                errorMessage: ""
            }
        case INVITE_MEMBER_FAIL:
            return {
                ...state,
                isLoading: false,
                errorMessage: ""
            }
        default:
            return {
                ...state,
            }
    }
}

export default memberReducer;