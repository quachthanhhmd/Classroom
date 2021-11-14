import { IUpdateCourseInput, IUpdateCourseInfoState } from './../interfaces/course.interface';
import courseApi from "../api/course.api";
import {
    CREATE_COURSE_FAIL, CREATE_COURSE_SUCCESS, GET_ALL_INFO_COURSE_FAIL, GET_ALL_INFO_COURSE_REQUEST, GET_ALL_INFO_COURSE_SUCCESS, GET_ALL_MEMBER_FAIL, GET_ALL_USER_COURSE_FAIL, GET_ALL_USER_COURSE_SUCCESS, JOIN_COURSE_BY_TOKEN_FAIL, JOIN_COURSE_BY_TOKEN_SUCCESS, JOIN_COURSE_BY_URL_FAIL, JOIN_COURSE_BY_URL_REQUEST, JOIN_COURSE_BY_URL_SUCCESS, JOIN_COURSE_FAIL, JOIN_COURSE_REQUEST, JOIN_COURSE_SUCCESS
} from "../constants";
import {
    ICourseInfoState, ICourseMemberState, ICreateCourse,
    ICreateCourseState,
    IInviteMemberState,
    IJoinCodeState,
    IJoinCourseByUrlState,
    IUserCourseState
} from "../interfaces";
import { GET_ALL_MEMBER_REQUEST, GET_ALL_MEMBER_SUCCESS, UPDATE_COURSE_INFO_FAIL, UPDATE_COURSE_INFO_REQUEST, UPDATE_COURSE_INFO_SUCCESS } from './../constants/course.constant';



export const createCourse = (data: ICreateCourse) =>
    async (dispatch: (args: ICreateCourseState) => ICreateCourseState) => {
        try {
            const result = await courseApi.createCourse(data);
            console.log(result);
            if (result.status !== 200) throw new Error();

            dispatch({
                type: CREATE_COURSE_SUCCESS,
                payload: result.data.payload,
            })

        } catch (err) {
            dispatch({
                type: CREATE_COURSE_FAIL
            })
        }
    };


export const getUserCouseList = () =>
    async (dispatch: (args: IUserCourseState) => IUserCourseState) => {
        try {
            let result = await courseApi.getAllCourse();

            if (result.status !== 200)
                throw new Error();

            if (result) {
                dispatch({
                    type: GET_ALL_USER_COURSE_SUCCESS,
                    payload: result.data.payload,
                });
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: GET_ALL_USER_COURSE_FAIL,
            });
        }
    };


export const getAllCourseInfo = (id: number) =>
    async (dispatch: (args: ICourseInfoState) => (ICourseInfoState)) => {
        try {
            dispatch({
                type: GET_ALL_INFO_COURSE_REQUEST
            });

            const result = await courseApi.getAllInfor(id);

            if (result.status !== 200) throw new Error();
            console.log(result.data);
            dispatch({
                type: GET_ALL_INFO_COURSE_SUCCESS,
                payload: result.data.payload,
            })
        } catch (err) {
            dispatch({
                type: GET_ALL_INFO_COURSE_FAIL
            })
        }
    }

export const joinCoursebyCode = (code: string) =>
    async (dispatch: (args: IJoinCodeState) => IJoinCodeState) => {
        try {
            dispatch({
                type: JOIN_COURSE_REQUEST
            })
            const result = await courseApi.joinCourse(code);

            if (result.status !== 200) throw new Error();

            dispatch({
                type: JOIN_COURSE_SUCCESS,
                payload: result.data.payload,
            })

        } catch (err) {
            dispatch({
                type: JOIN_COURSE_FAIL
            })
        }
    }

export const joinCourseByUrl = (courseId: number, code: string) =>
    async (dispatch: (args: IJoinCourseByUrlState) => IJoinCourseByUrlState) => {
        try {
            dispatch({
                type: JOIN_COURSE_BY_URL_REQUEST
            });

            const result = await courseApi.joinCourseByUrl(courseId, code);
            if (result.status !== 200) throw new Error();

            dispatch({ type: JOIN_COURSE_BY_URL_SUCCESS });
        } catch (err) {
            dispatch({
                type: JOIN_COURSE_BY_URL_FAIL
            })
        }
    };


export const getAllMemberInCourse = (courseId: number) =>
    async (dispatch: (args: ICourseMemberState) => ICourseMemberState) => {
        try {
            dispatch({
                type: GET_ALL_MEMBER_REQUEST,
            });

            const result = await courseApi.getAllMemberInCourse(courseId);
            if (result.status !== 200) throw new Error();

            dispatch({
                type: GET_ALL_MEMBER_SUCCESS,
                payload: result.data.payload,
            })
        } catch (err) {
            dispatch({
                type: GET_ALL_MEMBER_FAIL
            })
        }
    }

export const inviteCourseByToken = (courseId: number, token: string, role: string) =>
    async (dispatch: (args: IInviteMemberState) => IInviteMemberState) => {
        try {
            const result = await courseApi.joinCourseByToken(courseId, token, role);
            if (result.status !== 200) throw new Error();

            dispatch({
                type: JOIN_COURSE_BY_TOKEN_SUCCESS,
            })

        } catch (err) {
            dispatch({
                type: JOIN_COURSE_BY_TOKEN_FAIL,
            })
        }
    }


export const updateCourseInfo = (courseId: number, body: IUpdateCourseInput) =>
    async (dispatch: (args: IUpdateCourseInfoState) => IUpdateCourseInfoState) => {
        try {
            dispatch({
                type: UPDATE_COURSE_INFO_REQUEST
            })

            const result = await courseApi.updateCourseInfo(courseId, body);
            if (result.status !== 200) throw new Error();
            dispatch({
                type: UPDATE_COURSE_INFO_SUCCESS,
                payload: result.data.payload,
            })
        } catch (err) {
            dispatch({
                type: UPDATE_COURSE_INFO_FAIL
            })
        }
    }