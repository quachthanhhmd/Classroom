import courseApi from "../api/course.api";
import {
    CREATE_COURSE_FAIL, CREATE_COURSE_SUCCESS, GET_ALL_INFO_COURSE_FAIL, GET_ALL_INFO_COURSE_REQUEST,
    GET_ALL_INFO_COURSE_SUCCESS, GET_ALL_USER_COURSE_FAIL, GET_ALL_USER_COURSE_SUCCESS, JOIN_COURSE_BY_URL_FAIL, JOIN_COURSE_BY_URL_REQUEST, JOIN_COURSE_BY_URL_SUCCESS, JOIN_COURSE_FAIL, JOIN_COURSE_REQUEST, JOIN_COURSE_SUCCESS
} from "../constants";
import {
    ICourseInfoState, ICreateCourse,
    ICreateCourseState,
    IJoinCodeState,
    IJoinCourseByUrlState,
    IUserCourseState
} from "../interfaces";



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

        }catch(err) {
            dispatch({
                type: JOIN_COURSE_FAIL
            })
        }
    }

    export const joinCourseByUrl = (courseId: number, code: string) =>
        async (dispatch: (args: IJoinCourseByUrlState) => IJoinCourseByUrlState) =>{
            try {
                dispatch({
                    type: JOIN_COURSE_BY_URL_REQUEST
                });

                const result = await courseApi.joinCourseByUrl(courseId, code);
                if (result.status !==200) throw new Error();

                dispatch({ type: JOIN_COURSE_BY_URL_SUCCESS});
            } catch(err) {
                dispatch({ 
                    type: JOIN_COURSE_BY_URL_FAIL
                })
            }
        }