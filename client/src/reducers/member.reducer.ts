import { IMemberAction } from './../interfaces/member.interface';
import { IRoleMemberResponse } from "../interfaces"
import { GET_ROLE_MEMBER_FAIL, GET_ROLE_MEMBER_SUCCESS } from '../constants/member.constant';

interface IInitState {
    currentRole: IRoleMemberResponse | null,

}
const initState: IInitState = {
    currentRole: null,
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
        default:
            return {
                ...state,
            }
    }
}

export default memberReducer;