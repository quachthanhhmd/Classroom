import {
    CREATE_COURSE_REQUEST,
    CREATE_COURSE_SUCCESS,
    CREATE_COURSE_FAIL,
    GET_ALL_USER_COURSE_SUCCESS,
    GET_ALL_USER_COURSE_FAIL,
    GET_ALL_USER_COURSE_REQUEST
} from "../constants";

import {
    ICourseAction,
    ICreateCourse,
    ICreateCourseState,
    ICourseSummary,
    IPaginationInfo,
    IUserCourseState
} from "../interfaces";

interface IInitState {
    data: ICourseSummary[],
    isLoading: boolean,
    course: ICourseSummary | null,
    pagination: IPaginationInfo
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
    }
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
                course: action.payload!,
                isLoading: false,
            }
        case CREATE_COURSE_FAIL:
            return {
                ...state,
                course: null,
                isLoading: true,
            }
        case GET_ALL_USER_COURSE_REQUEST:
            return {
                ...state,
                data: [],
                isLoading: true
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