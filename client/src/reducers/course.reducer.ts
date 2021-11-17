import {
    CREATE_COURSE_FAIL, CREATE_COURSE_REQUEST,
    CREATE_COURSE_SUCCESS, GET_ALL_INFO_COURSE_FAIL, GET_ALL_INFO_COURSE_REQUEST,
    GET_ALL_INFO_COURSE_SUCCESS, GET_ALL_MEMBER_FAIL, GET_ALL_MEMBER_REQUEST, GET_ALL_MEMBER_SUCCESS, GET_ALL_USER_COURSE_FAIL,
    GET_ALL_USER_COURSE_REQUEST, GET_ALL_USER_COURSE_SUCCESS, JOIN_COURSE_BY_TOKEN_FAIL, JOIN_COURSE_BY_TOKEN_SUCCESS, JOIN_COURSE_BY_URL_FAIL, JOIN_COURSE_BY_URL_REQUEST, JOIN_COURSE_BY_URL_SUCCESS, JOIN_COURSE_FAIL, JOIN_COURSE_REQUEST, JOIN_COURSE_SUCCESS
} from "../constants";
import {
    ICourseAction, ICourseInfo, ICourseSummary, ICreateCourseState, IMemberSummary, IPaginationInfo,
    IUserCourseState
} from "../interfaces";
import { UPDATE_COURSE_INFO_FAIL, UPDATE_COURSE_INFO_REQUEST, UPDATE_COURSE_INFO_SUCCESS } from './../constants/course.constant';
import { UPDATE_MEMBER_STATE_FAIL, UPDATE_MEMBER_STATE_SUCCESS } from './../constants/member.constant';


interface IInitState {
    data: ICourseSummary[],
    isLoading: boolean,
    course: ICourseSummary | ICourseInfo | null,
    pagination: IPaginationInfo
    memberList: IMemberSummary[],
    isSuccess: boolean,
    errorMessage: string,
}

const initState: IInitState = {
    isLoading: false,
    data: [],
    course: null,
    pagination: {
        total: 0,
        size: 0,
        totalPages: 0,
        page: 0,
    },
    memberList: [],
    isSuccess: false,
    errorMessage: "",
}


const courseReducer = (state = initState, action: ICourseAction): IInitState => {
    switch (action.type) {
        case CREATE_COURSE_REQUEST:
            return {
                ...state,
                course: null,
                isLoading: true,
            }
        case CREATE_COURSE_SUCCESS:
            action = action as ICreateCourseState;
            state.data.push(action.payload!);

            return {
                ...state,
                course: action.payload! as ICourseSummary,
                isLoading: false,
                isSuccess: true,
            }
        case UPDATE_COURSE_INFO_REQUEST:
            return {
                ...state,
                course: null,
                isLoading: true,
            }
        case UPDATE_COURSE_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                course: action.payload! as ICourseInfo,
                isSuccess: true,
            }
        case UPDATE_COURSE_INFO_FAIL:
            return {
                ...state,
                isLoading: false,
                isSuccess: false,
                errorMessage: "update",
            }
        case CREATE_COURSE_FAIL:
            return {
                ...state,
                course: null,
                isLoading: false,
                errorMessage: "create",
                isSuccess: false,
            }
        case JOIN_COURSE_REQUEST:
            return {
                ...state,
                course: null,
                isLoading: true,
            }
        case JOIN_COURSE_SUCCESS:
            return {
                ...state,
                isLoading: true,
                course: action.payload! as ICourseInfo,
            }
        case JOIN_COURSE_FAIL:
            return {
                ...state,
                isLoading: false,
                errorMessage: "join",
                isSuccess: false,
            }
        case GET_ALL_USER_COURSE_REQUEST:
            return {
                ...state,
                data: [],
                isLoading: true
            }
        case JOIN_COURSE_BY_URL_REQUEST:
        case JOIN_COURSE_BY_URL_FAIL:
            return {
                ...state,
                isLoading: true,
                data: [],
            }
        case JOIN_COURSE_BY_URL_SUCCESS:
            return {
                ...state,
                isLoading: false,
            }
        case GET_ALL_USER_COURSE_SUCCESS:
            action = action as IUserCourseState;
            return {
                ...state,
                data: action.payload!.courses,
                pagination: action.payload!.pagination,
                isLoading: false,
                
            }
        case GET_ALL_USER_COURSE_FAIL: {
            return {
                ...state,
                data: [],
                isLoading: false,
                errorMessage: "get_all",
                isSuccess: false,
            }
        }
        case GET_ALL_INFO_COURSE_REQUEST:
            return {
                ...state,
                isLoading: true,
                course: null,
            }
        case GET_ALL_INFO_COURSE_SUCCESS:
            return {
                ...state,
                isLoading: true,
                course: action.payload! as ICourseInfo,
            }
        case GET_ALL_INFO_COURSE_FAIL:
            return {
                ...state,
                isLoading: true,
                course: null,
                errorMessage: "info",
                isSuccess: false,
            }
        case GET_ALL_MEMBER_FAIL:
            return {
                ...state,
                isLoading: false,
                data: [],
                errorMessage: "member",
                isSuccess: false,
            }
        case GET_ALL_MEMBER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                memberList: action.payload,
            }
        case GET_ALL_MEMBER_REQUEST:
            return {
                ...state,
                isLoading: true,
                data: [],
            }
        case JOIN_COURSE_BY_TOKEN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                data: []
            }
        case JOIN_COURSE_BY_TOKEN_FAIL:
            return {
                ...state,
                isLoading: false,
                isSuccess: false,
                data: []
            }
        case UPDATE_MEMBER_STATE_SUCCESS:
            console.log(action.payload);
            const newMemberList = state.memberList.filter(member => {
                if (member.user.userId !== +action.payload.userId) return member;
            })
            console.log(newMemberList);
            return {
                ...state,
                memberList: newMemberList,
                isLoading: false,
                isSuccess: true,

            }
        case UPDATE_MEMBER_STATE_FAIL:
            return {
                ...state,
                isSuccess: false,

            }
        default: {
            return {
                ...state,

            }
        }
    }
}


export default courseReducer;