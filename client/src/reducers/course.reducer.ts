import { CREATE_EXERCISE_TYPE_SUCCESS, UPDATE_EXERCISE_TYPE_SUCCESS } from './../constants/exercise.constant';
import {
    CREATE_COURSE_FAIL, CREATE_COURSE_REQUEST,
    CREATE_COURSE_SUCCESS, DELETE_MESSAGE, GET_ALL_INFO_COURSE_FAIL, GET_ALL_INFO_COURSE_REQUEST,
    GET_ALL_INFO_COURSE_SUCCESS, GET_ALL_MEMBER_FAIL, GET_ALL_MEMBER_REQUEST, GET_ALL_MEMBER_SUCCESS, GET_ALL_USER_COURSE_FAIL, GET_ALL_USER_COURSE_REQUEST, GET_ALL_USER_COURSE_SUCCESS, JOIN_COURSE_BY_TOKEN_FAIL, JOIN_COURSE_BY_TOKEN_SUCCESS, JOIN_COURSE_BY_URL_FAIL, JOIN_COURSE_BY_URL_REQUEST, JOIN_COURSE_BY_URL_SUCCESS, JOIN_COURSE_FAIL, JOIN_COURSE_REQUEST, JOIN_COURSE_SUCCESS
} from "../constants";
import {
    ICourseAction, ICourseInfo, ICourseSummary, ICreateCourseState, IExerciseTypeDetail, IMemberSummary, IPaginationInfo,
    IUserCourseState
} from "../interfaces";
import { CREATE_COURSE_FAIL_MESSAGE, CREATE_COURSE_SUCCESS_MESSAGE, FORBIDDEN_MESSAGE, JOIN_COURSE_FAIL_MESSAGE, JOIN_COURSE_SUCCESS_MESSAGE } from "../messages";
import { UPDATE_COURSE_INFO_FAIL, UPDATE_COURSE_INFO_REQUEST, UPDATE_COURSE_INFO_SUCCESS } from './../constants/course.constant';
import { UPDATE_MEMBER_STATE_FAIL, UPDATE_MEMBER_STATE_SUCCESS } from './../constants/member.constant';


interface IInitState {
    data: ICourseSummary[],
    isLoading: boolean,
    course: ICourseInfo | null,
    pagination: IPaginationInfo
    memberList: IMemberSummary[],
    isSuccess: boolean,
    message: string,
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
    message: "",
}


const courseReducer = (state = initState, action: ICourseAction): IInitState => {
    switch (action.type) {
        case DELETE_MESSAGE:
            return {
                ...state,
                message: ""
            }
        case CREATE_COURSE_REQUEST:
            return {
                ...state,
                course: null,
                isLoading: true,
                isSuccess: false,
                message: ""
            }
        case CREATE_COURSE_SUCCESS:
            action = action as ICreateCourseState;
            state.data.push(action.payload!);

            return {
                ...state,
                course: action.payload! as ICourseInfo,
                isLoading: false,
                isSuccess: true,
                message: CREATE_COURSE_SUCCESS_MESSAGE
            }
        case UPDATE_COURSE_INFO_REQUEST:
            return {
                ...state,
                course: null,
                isLoading: true,
                isSuccess: false,
                message: ""
            }
        case UPDATE_COURSE_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                course: action.payload! as ICourseInfo,
                isSuccess: true,
                message: ""
            }
        case UPDATE_COURSE_INFO_FAIL:
            return {
                ...state,
                isLoading: false,
                isSuccess: false,
                message: FORBIDDEN_MESSAGE,
            }
        case CREATE_COURSE_FAIL:
            return {
                ...state,
                course: null,
                isLoading: false,
                isSuccess: false,
                message: CREATE_COURSE_FAIL_MESSAGE,
            }
        case JOIN_COURSE_REQUEST:
            return {
                ...state,
                course: null,
                isLoading: true,
                isSuccess: false,
                message: ""
            }
        case JOIN_COURSE_SUCCESS:
            return {
                ...state,
                isLoading: true,
                course: action.payload! as ICourseInfo,
                isSuccess: true,
                message: JOIN_COURSE_SUCCESS_MESSAGE
            }
        case JOIN_COURSE_FAIL:
            return {
                ...state,
                isLoading: false,
                message: JOIN_COURSE_FAIL_MESSAGE,
                isSuccess: false,
            }
        case GET_ALL_USER_COURSE_REQUEST:
            return {
                ...state,
                data: [],
                isLoading: true,
                isSuccess: false,
                message: "",
            }
        case JOIN_COURSE_BY_URL_REQUEST:
        case JOIN_COURSE_BY_URL_FAIL:
            return {
                ...state,
                isLoading: true,
                data: [],
                isSuccess: false,
                message: "",
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
                isSuccess: true,
                message: "",
            }
        case GET_ALL_USER_COURSE_FAIL: {
            return {
                ...state,
                data: [],
                isLoading: false,
                message: FORBIDDEN_MESSAGE,
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
                isLoading: false,
                course: action.payload! as ICourseInfo,
            }
        case GET_ALL_INFO_COURSE_FAIL:
            return {
                ...state,
                isLoading: false,
                course: null,
                message: FORBIDDEN_MESSAGE,
                isSuccess: false,
            }
        case GET_ALL_MEMBER_FAIL:
            return {
                ...state,
                isLoading: false,
                data: [],
                message: FORBIDDEN_MESSAGE,
                isSuccess: false,

            }
        case GET_ALL_MEMBER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                memberList: action.payload,
                isSuccess: true,
                message: "",
            }
        case GET_ALL_MEMBER_REQUEST:
            return {
                ...state,
                isLoading: true,
                data: [],
                isSuccess: false,
                message: "",
            }
        case JOIN_COURSE_BY_TOKEN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                data: [],
                message: JOIN_COURSE_SUCCESS_MESSAGE
            }
        case JOIN_COURSE_BY_TOKEN_FAIL:
            return {
                ...state,
                isLoading: false,
                isSuccess: false,
                data: [],
                message: JOIN_COURSE_FAIL_MESSAGE
            }
        case UPDATE_MEMBER_STATE_SUCCESS:

            const newMemberList = state.memberList.filter(member => {
                if (member.user.userId !== +action.payload.userId) return member;
            })

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
                isLoading: false,
            }
        case UPDATE_EXERCISE_TYPE_SUCCESS:
        case CREATE_EXERCISE_TYPE_SUCCESS: {
            let newCourseUpdate = state.course;
            if (newCourseUpdate && newCourseUpdate?.exerciseTypeList) {
                newCourseUpdate.exerciseTypeList.push(action.payload as IExerciseTypeDetail);
            }
            return {
                ...state,
                course: newCourseUpdate,
                isSuccess: true,
                message: ""
            }
        }

        default: {
            return {
                ...state,

            }
        }
    }
}


export default courseReducer;