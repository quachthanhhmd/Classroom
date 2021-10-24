import {
    CREATE_COURSE_SUCCESS,
    CREATE_COURSE_FAIL,
    GET_ALL_USER_COURSE_SUCCESS,
    GET_ALL_USER_COURSE_FAIL
} from "../constants";
import {
    ICreateCourse,
    ICreateCourseState,
    IUserCourseState
} from "../interfaces";
import courseApi from "../api/course.api";



export const createCourse = (data: ICreateCourse) =>
    async (dispatch: (args: ICreateCourseState) => ICreateCourseState) => {
        try {
            const result = await courseApi.createCourse(data);

            if (result.status !== 200) throw new Error();

            dispatch({
                type: CREATE_COURSE_SUCCESS
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
                    payload: result.data,
                });
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: GET_ALL_USER_COURSE_FAIL,
            });
        }
    };
