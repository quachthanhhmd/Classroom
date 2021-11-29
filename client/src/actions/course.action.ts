import courseApi from "../api/course.api";
import { CREATE_COURSE_FAIL, CREATE_COURSE_SUCCESS, GET_ALL_INFO_COURSE_FAIL, GET_ALL_INFO_COURSE_REQUEST, GET_ALL_INFO_COURSE_SUCCESS, GET_ALL_MEMBER_FAIL, GET_ALL_USER_COURSE_FAIL, GET_ALL_USER_COURSE_SUCCESS, JOIN_COURSE_BY_TOKEN_FAIL, JOIN_COURSE_BY_TOKEN_SUCCESS, JOIN_COURSE_BY_URL_FAIL, JOIN_COURSE_BY_URL_REQUEST, JOIN_COURSE_BY_URL_SUCCESS, JOIN_COURSE_FAIL, JOIN_COURSE_REQUEST, JOIN_COURSE_SUCCESS, NOTIFICATION_FAIL, NOTIFICATION_SUCCESS } from "../constants";
import {
    ICourseInfoState, ICourseMemberState, ICreateCourse,
    ICreateCourseState,
    IInviteMemberState,
    IJoinCodeState,
    IJoinCourseByUrlState,
    IUserCourseState
} from "../interfaces";
import { CREATE_COURSE_FAIL_MESSAGE, CREATE_COURSE_SUCCESS_MESSAGE, JOIN_COURSE_FAIL_MESSAGE, JOIN_COURSE_SUCCESS_MESSAGE, UPDATE_COURSE_FAIL_MESSAGE, UPDATE_COURSE_SUCCESS_MESSAGE } from '../messages';
import { GET_ALL_MEMBER_REQUEST, GET_ALL_MEMBER_SUCCESS, UPDATE_COURSE_INFO_FAIL, UPDATE_COURSE_INFO_REQUEST, UPDATE_COURSE_INFO_SUCCESS } from './../constants/course.constant';
import { IUpdateCourseInput } from './../interfaces/course.interface';

export const createCourse = (data: ICreateCourse) =>
    async (dispatch) => {
        try {
            const result = await courseApi.createCourse(data);
            if (result.status !== 200) throw new Error();

            dispatch({
                type: NOTIFICATION_SUCCESS,
                payload: CREATE_COURSE_SUCCESS_MESSAGE
            })

            dispatch({
                type: CREATE_COURSE_SUCCESS,
                payload: result.data.payload,
            })

        } catch (err) {
            dispatch({
                type: NOTIFICATION_FAIL,
                payload: CREATE_COURSE_FAIL_MESSAGE
            })
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
    async (dispatch) => {
        try {
            dispatch({
                type: JOIN_COURSE_REQUEST
            })
            const result = await courseApi.joinCourse(code);

            if (result.status !== 200) throw new Error();

            dispatch({
                type: NOTIFICATION_SUCCESS,
                payload: JOIN_COURSE_SUCCESS_MESSAGE
            })
            dispatch({
                type: JOIN_COURSE_SUCCESS,
                payload: result.data.payload,
            })

        } catch (err) {
            dispatch({
                type: NOTIFICATION_FAIL,
                payload: JOIN_COURSE_FAIL_MESSAGE
            })
            dispatch({
                type: JOIN_COURSE_FAIL
            });

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
            dispatch({
                type: NOTIFICATION_SUCCESS,
                payload: JOIN_COURSE_SUCCESS_MESSAGE
            })
            dispatch({ type: JOIN_COURSE_BY_URL_SUCCESS });
        } catch (err) {
            dispatch({
                type: NOTIFICATION_SUCCESS,
                payload: JOIN_COURSE_FAIL_MESSAGE
            })
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

            if (result.data.code !== 200) throw new Error();

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
    async (dispatch) => {
        try {
            dispatch({
                type: UPDATE_COURSE_INFO_REQUEST
            })

            const result = await courseApi.updateCourseInfo(courseId, body);
            if (result.status !== 200) throw new Error();

            dispatch({
                type: NOTIFICATION_SUCCESS,
                payload: UPDATE_COURSE_SUCCESS_MESSAGE
            })
            dispatch({
                type: UPDATE_COURSE_INFO_SUCCESS,
                payload: result.data.payload,
            })
        } catch (err) {
            dispatch({
                type: UPDATE_COURSE_INFO_FAIL
            });
            dispatch({
                type: NOTIFICATION_FAIL,
                payload: UPDATE_COURSE_FAIL_MESSAGE
            })
        }
    }



